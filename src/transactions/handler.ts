import { Request, Response } from 'express';
import http from 'http';

import { dbConnPool } from '../helpers/connection';
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
      SELECT SUM(transaction_value), COUNT(*) FROM transaction
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
          const transactionValues: [UpdateTransactionsResponse] =
            await conn.query(getUpdatedTransactionsSql, [
              period_from_datetime,
              period_to_datetime,
            ]);

          const transaction_value =
            transactionValues[0]['SUM(transaction_value)'];
          const transaction_count = transactionValues[0]['COUNT(*)'];

          const request = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/completePaymentNote',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          request.write(
            JSON.stringify({
              payment_note_uuid,
              transaction_value,
              transaction_count,
            }),
            () => {
              request.end();
            },
          );

          res.sendStatus(200);
        });
    } catch (e) {
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
      const transactions = await conn
        .query(getAllTransActionsWithPaymentNoteId, [req.params.paymentNoteId])
        .catch((e) => {
          console.log(e);
        });

      res.send(transactions);
    } catch (e) {
      res.sendStatus(e.message);
    }
  });
}
