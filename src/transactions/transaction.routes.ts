import { Router } from "express";
import { createTransaction, getBalance, getTransactions } from "./transaction.controller";
import { isAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/transactions", isAuth, getTransactions);
router.post("/createTransaction", isAuth, createTransaction);
router.get("/balance", isAuth, getBalance);

export default router;