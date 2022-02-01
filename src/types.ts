interface CreatePaymentNoteResponseObject {
  payment_note_uuid: string;
}

export type CreatePaymentNoteResponse = [CreatePaymentNoteResponseObject];

export interface UpdateTransactionsResponse {
  transaction_value: number;
}
