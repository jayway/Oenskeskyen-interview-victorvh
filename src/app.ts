import bodyParser from 'body-parser';
import express from 'express';

import { handleCompletePaymentNote, handleCreatePaymentNote, handleGetPaymentNotes } from './payment-note/handler';
import { handleGetTransactionsWithPaymentNoteId, handleUpdateTransactions } from './transactions/handler';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app started on port: ${port}`);
});

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/paymentNotes', handleGetPaymentNotes);
app.post('/createPaymentNote', handleCreatePaymentNote);
app.post('/completePaymentNote', handleCompletePaymentNote);

app.get('/transactions/:paymentNoteId', handleGetTransactionsWithPaymentNoteId);
app.post('/updateTransactions', handleUpdateTransactions);
