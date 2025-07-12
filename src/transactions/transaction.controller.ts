import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";
import {prisma} from "../prisma/client";

const transactionService = new TransactionService();


export const getTransactions = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const dateParam = req.query.date as string;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        if (dateParam) {
            const transactions = await transactionService.getTransactionForDate(userId, dateParam);
            return res.json(transactions);
        } else {
            const transactions = await transactionService.getTransactions(userId);
            res.json(transactions);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createTransaction = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const transaction = await transactionService.createTransaction(userId, req.body);
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getBalance = async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  try {
    const balance = await transactionService.getBalance(userId);
    res.json(balance);
  } catch (error) {
    console.error("Error calculating balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};