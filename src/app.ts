import bodyParser from 'body-parser';
import express from 'express';

import { handleCompletePaymentNote, handleCreatePaymentNote, handleGetPaymentNotes } from './payment-note/handler';
import { handleGetTransactionsWithPaymentNoteId, handleUpdateTransactions } from './transactions/handler';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Express app started on port: ${port}`);
});

app.use(bodyParser.json({ type: 'application/json' }));

app.post('/createPaymentNote', handleCreatePaymentNote);

app.post('/updateTransactions', handleUpdateTransactions);

app.post('/completePaymentNote', handleCompletePaymentNote);

app.get('/paymentNotes', handleGetPaymentNotes);

app.get('/transactions/:paymentNoteId', handleGetTransactionsWithPaymentNoteId);
