import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TransactionService {

    async getTransactions(userId: number) {

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
    
    async getTransactionsFiltered(userId: number, dateParam?: string, typeParam?: string) {
        const where: any = { userId };

        if (dateParam) {
            const start = new Date(dateParam + "T00:00:00Z");
            const end = new Date(dateParam + "T23:59:59.999Z");
            where.createdAt = { gte: start, lte: end };
        }

        if (typeParam && (typeParam === "INCOME" || typeParam === "EXPENSE")) {
            where.type = typeParam;
        }

        try {
            const transactions = await prisma.transaction.findMany({
                where,
                orderBy: { createdAt: 'desc' },
            });
            return transactions;
        } catch (error) {
            // Manejo de error...
            throw error;
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