import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TransactionService {

    async getTransactions(userId: string) {

        try {
            const transactions = await prisma.transaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });

            return transactions;
        } catch (error) {
            console.error("Error fetching transactions:", error);
            throw new Error("Internal server error");
        }
    }

    async createTransaction(userId: string, transactionData: any) {

        try {
            const transaction = await prisma.transaction.create({
                data: {
                    ...transactionData,
                    userId,
                },
            });

            return transaction;
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw new Error("Internal server error");
        }
    }

    async getBalance(userId: number) {
        const incomeResult = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userId,
            type: 'INCOME',
        },
        });

        const expenseResult = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userId,
            type: 'EXPENSE',
        },
        });

        const income = incomeResult._sum.amount || 0;
        const expense = expenseResult._sum.amount || 0;
        const balance = income - expense;

        return {
        balance,
        };
  }
}