import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "./auth.controller";

const router = Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);

export default router;