import { Router } from "express";
import { getTransactions } from "./transaction.controller";
import { isAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/transactions", isAuth, getTransactions);

export default router;