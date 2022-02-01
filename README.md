# ✨Heylink Developer Job Interview Project Tasks ✨

## Project : Payment notes

### 🚨 Requirements

DATABASE : **MySQL Wire Protocol compatible**

CODE : **TypeScript (Node.js)**

FRAMEWORK : **[Express](https://www.npmjs.com/package/express)**

### ℹ️ Notes

Attempt to have a loose coupling between payment_note & transaction, both via code architecture and MySQL / queries.

### 📙 Database tables

`transaction` (pre populated table available in repository transaction.sql)

        transaction_uuid
        transaction_status_code
        transaction_value
        transaction_datetime
        transaction_payment_note_uuid

`payment_note` (create this table yourself)

        payment_note_uuid
        payment_note_period_from_datetime
        payment_note_period_to_datetime
        payment_note_created_datetime
        payment_note_transactions_count
        payment_note_value
        payment_note_status_code | CREATING | COMPLETED

### 🏗️ Tasks

- Import the provided SQL dataset of transaction table
- Create a table for the payment_note table (also save the SQL statement in transaction.sql in the root of the project)
- Create an API which will create a new payment_note entity
  - _Requirements:_
    x Creation must possible via an API - period_from_datetime & period_to_datetime must be defined by the user of that API
    x Initial state of payment_note_value is 0, initial value of payment_note_status_code is CREATING, initial value of payment_note_transactions_count = 0
    x Once the payment note has been completed, and a payment_note_uuid has been generated, it should be used in the next task
    x (The API user does not need to wait for transactions to be marked - but only about wether the payment_note creation was successful or not)
- Update affected transactions
  - _Requirements:_
    x update affected transactions with the payment_note_uuid & change transaction_status_code to PAID
    x only transactions that has a status code of "pending" and where the transaction_datetime is within the from/to period of the payment-note are eligible to be updated
- Complete the payment_note
  x Once all transactions has been marked, the sum of the transaction_value & count of affected transactions should be updated to the regarding payment_note entity
  x Updating these values should also set the payment_note_status_code to COMPLETED
  x Create an API/Endpoint where a user can query all payment_notes
  x Create an API/Endpoint where the user can query a specific payment_note and get back all transaction referenced/related to the payment_note_uuid
- Create a readme.md in the root folder with information on how to get the project running in localhost.

### 🤔 Questions

1. What do you see as potential issues, if the volume of transactions per payment note is ever increasing?

2. If you had the option to choose any tech-stack & service(s) to help scale up the handling of an ever increasing volume of transactions, which would you choose & how would each chosen option help?

2.1 Would the chosen options change the architecture of the code written for this task? If so, explain briefly what would change.

### 📨 Submitting

Upload your project to your Git & include the url of the repository in your application. Remember that the repository must be public!
Submit the questions together with your job application.
