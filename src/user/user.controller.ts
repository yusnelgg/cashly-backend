import { Request, Response } from "express";
import {prisma} from "../prisma/client";

export const getMe = async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    })

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
}