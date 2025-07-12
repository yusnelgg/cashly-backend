import { Router } from "express";
import { getMe } from "./user.controller";
import { isAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/me", isAuth, getMe);

export default router;