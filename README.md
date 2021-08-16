Pacioli

## What is it?

It is an open source project to build a simple accounting system for small businesses and freelancers. Keep in mind that this is an accounting software, NOT billing, NOT CRM, NOT expense tracking. It is meant to provide a simple interface to record journal entries based on transactions.

## Accounting Talk

Accountants love journal entries, because every financial transaction or manual entry at the end is represented by a journal entry. A journal entry is basically a bunch of debits and a bunch of credits, and sum of each must equal each other.

The core of Pacioli revolves around journal entries, and there are only two interfaces for them: Transaction and Adjustment. It is simple because it should be. If you sit back and think about accounting in general, these are the only two things we can do to affect our financial statements.

## Transaction vs Adjustment

Transactions are journal entries arise from normal business. You can think of them as selling things, or buying stuff, or making cash deposits. These are all transactions.

Adjustments are journal entries made to change your financial statements. For example, depreciation is a journal entry that your accountant makes every year, or in more general terms, accountants need to make accruals to fairly present your financial statements.

## Tech Stack

This project is built with React/Node/Fastify/Apollo/Prisma/Postgresql.
