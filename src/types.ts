interface CreatePaymentNoteResponseObject {
  payment_note_uuid: string;
}

export type CreatePaymentNoteResponse = [CreatePaymentNoteResponseObject];

export interface UpdateTransactionsResponse {
  'SUM(transaction_value)': number;
  'COUNT(*)': number;
}
