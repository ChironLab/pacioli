import faker from 'faker';
import { TransactorType } from '@prisma/client';
import { initServices } from '../services';
import { initConfig } from '../config';

const entryCreateFactory = (accountId: number, amount: number) => ({
  accountId,
  amount,
});

export const seed = async () => {
  const config = initConfig();
  const services = initServices(config);

  const { prisma, logger } = config;

  logger.info('Creating special accounts.');

  const createSpecialAccounts = prisma.account.createMany({
    data: services.accounting.account.getSpecialAccountsDetails(),
    skipDuplicates: true,
  });

  logger.info('Creating beginning balance.');
  const createBeginningBalance = prisma.adjustment.create({
    data: {
      description: 'Beginning balance',
      journal: {
        create: {
          type: 'ADJUSTMENT',
          entries: {
            createMany: {
              data: [
                entryCreateFactory(1000, 100.05),
                entryCreateFactory(1900, 200.75),
                entryCreateFactory(3900, -100.05),
                entryCreateFactory(5000, -200.75),
              ],
            },
          },
        },
      },
    },
  });

  logger.info('Creating customers and transactions.');

  const createCustomer = prisma.transactor.create({
    data: {
      name: faker.company.companyName(),
      type: TransactorType.CUSTOMER,
      transactions: {
        create: {
          type: 'CUSTOMER_INVOICE',
          description: 'Dummy cash sales.',
          meta: JSON.stringify({
            date: new Date().toDateString(),
            address: '123 Gogo St, Yoko, NY 12020',
          }),
          journal: {
            create: {
              type: 'TRANSACTION',
              entries: {
                createMany: {
                  data: [
                    entryCreateFactory(1000, 99.99),
                    entryCreateFactory(6001, -99.99),
                  ],
                },
              },
            },
          },
        },
      },
    },
  });

  logger.info('Creating vendor and transactions');

  const createVendor = prisma.transactor.create({
    data: {
      name: faker.company.companyName(),
      type: TransactorType.VENDOR,
      transactions: {
        create: {
          type: 'VENDOR_INVOICE',
          description: 'Dummy payment',
          meta: JSON.stringify({ PO: 12345 }),
          journal: {
            create: {
              type: 'TRANSACTION',
              entries: {
                createMany: {
                  data: [
                    entryCreateFactory(1000, -45),
                    entryCreateFactory(3900, 45),
                  ],
                },
              },
            },
          },
        },
      },
    },
  });

  await prisma.$transaction([
    createSpecialAccounts,
    createBeginningBalance,
    createCustomer,
    createVendor,
  ]);
};

seed();
