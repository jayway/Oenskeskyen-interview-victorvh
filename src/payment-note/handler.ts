import { Request, Response } from 'express';

import { dbConnPool } from '../connection';
import { CreatePaymentNoteResponse } from '../types';

export function handleCreatePaymentNote(req: Request, res: Response) {
  const { period_from_datetime, period_to_datetime } = req.body;

  dbConnPool.getConnection().then(async (conn) => {
    const createPaymentNoteSql = `
      INSERT INTO payment_note (
        payment_note_period_from_datetime, 
        payment_note_period_to_datetime
      )
      VALUES (?, ?)
      RETURNING payment_note_uuid 
    `;

    try {
      const paymentNoteResponse: CreatePaymentNoteResponse = await conn.query(
        createPaymentNoteSql,
        [period_from_datetime, period_to_datetime],
      );

      const paymentNoteUuid = paymentNoteResponse[0].payment_note_uuid;
      // call next endpoint

      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  });
}

export function handleCompletePaymentNote(req: Request, res: Response) {
  const { payment_note_uuid, transaction_value, transaction_count } = req.body;

  dbConnPool.getConnection().then((conn) => {
    const completePaymentNoteSql = `
      UPDATE payment_note 
      SET payment_note_value = ?,
      payment_note_transactions_count = ?,
      payment_note_status_code = 'COMPLETED'
      WHERE payment_note_uuid = ?
    `;

    try {
      conn
        .query(completePaymentNoteSql, [
          transaction_value,
          transaction_count,
          payment_note_uuid,
        ])
        .then(() => res.sendStatus(200));
    } catch (e) {
      res.sendStatus(500);
    }
  });
}

export function handleGetPaymentNotes(req: Request, res: Response) {
  dbConnPool.getConnection().then(async (conn) => {
    const getAllPaymentNotesSql = `
      SELECT * FROM payment_notes
    `;

    try {
      const paymentNotes = await conn.query(getAllPaymentNotesSql);

      res.send(paymentNotes);
    } catch (e) {
      res.sendStatus(500);
    }
  });
}
