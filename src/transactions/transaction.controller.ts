import { Request, Response } from "express";
import {prisma} from "../prisma/client";

export const getTransactions = async (req: Request, res: Response) => { 
    const userId = req.user?.userId;

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

