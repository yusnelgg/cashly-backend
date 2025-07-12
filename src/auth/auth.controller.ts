import {Request, Response} from "express";
import {AuthService} from "./auth.service";

const auth = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await auth.register(email, password);
        return res.status(201).json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(400).json({error: errorMessage});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await auth.login(email, password);
        return res.status(200).json(user);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(400).json({error: errorMessage});
    }
};

export const logoutUser = async (req: Request, res: Response) => {
   try {
        const {userId} = req.body;
        await auth.logout(userId);
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(400).json({error: errorMessage});
   }
};