import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export class AuthService {
    private secretKey = process.env.JWT_SECRET || "secretKey";

    async login(email: string, password: string) {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = sign({ userId: user.id }, this.secretKey, { expiresIn: "1h" });
        const { password: userPassword, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }

    async register(email: string, password: string) {
        const prisma = new PrismaClient();
        const hashedPassword = await hash(password, 10);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("Email is already in use");
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const { password: userPassword, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };;
    }

    async logout(userId: string) {
        return { message: "Logout successful" };
    }
}