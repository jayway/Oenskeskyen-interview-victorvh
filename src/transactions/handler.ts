import { Request, Response } from 'express';

import { dbConnPool } from '../connection';
import { UpdateTransactionsResponse } from '../types';

export function handleUpdateTransactions(req: Request, res: Response) {
  const { payment_note_uuid, period_from_datetime, period_to_datetime } =
    req.body;

  dbConnPool.getConnection().then((conn) => {
    const updateTransactionSql = `
      UPDATE transaction 
      SET transaction_payment_note_uuid = ?,
        transaction_status_code = 'PAID'
      WHERE transaction_status_code = 'PENDING' AND
      transaction_datetime > ? AND transaction_datetime < ?
    `;

    const getUpdatedTransactionsSql = `
      SELECT transaction_value FROM transaction
      WHERE transaction_status_code = 'PAID' AND
      transaction_datetime > ? AND transaction_datetime < ?
    `;

    try {
      conn
        .query(updateTransactionSql, [
          payment_note_uuid,
          period_from_datetime,
          period_to_datetime,
        ])
        .then(async () => {
          const transactionValues: UpdateTransactionsResponse[] =
            await conn.query(getUpdatedTransactionsSql, [
              period_from_datetime,
              period_to_datetime,
            ]);

          const transactionCount = transactionValues.length;
          const transactionValue = transactionValues.reduce(
            (acc, tv) => acc + tv.transaction_value,
            0,
          );
          // call next endpoint
        });

      res.sendStatus(200);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(500);
    }
  });
}

export function handleGetTransactionsWithPaymentNoteId(
  req: Request,
  res: Response,
) {
  dbConnPool.getConnection().then(async (conn) => {
    const getAllTransActionsWithPaymentNoteId = `
      SELECT * FROM transaction
      WHERE transaction_payment_note_uuid = ?
    `;

    try {
      const transactions = await conn.query(
        getAllTransActionsWithPaymentNoteId,
        [req.params.paymentNoteId],
      );

      res.send(transactions);
    } catch (e) {
      res.sendStatus(500);
    }
  });
}
