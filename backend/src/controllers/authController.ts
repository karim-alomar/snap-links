import { User } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { getUserByEmail, getUserById } from "../actions/auth";
import { JWT_SECRET_KEY } from "../secret";

export const auth = async (req: Request, res: Response) => {
  const token = req.headers["authorization"] as string;

  const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };

  const user = await getUserById(decodedToken.userId);

  if (!user) {
    res.status(400).json({
      messages: {
        error: "User not found",
      },
    });
    return;
  }

  res.json({
    data: user,
    messages: {
      success: "Success",
    },
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const guestId = req.headers["guest_id"] as string;

    let user: User | any = await getUserByEmail(email);

    if (user) {
      res.json({
        messages: { error: "User already exists" },
      });
      return;
    }

    const hashPassword = hashSync(password, 10);

    user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    if (guestId) {
      await db.link.updateMany({
        where: { guestId },
        data: { userId: user.id, guestId: null },
      });
    }
    res.json({
      data: user,
      messages: {
        success: "Success",
      },
    });
  } catch (error: any) {
    res.json({ messages: { error: error?.message } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const guestId = req.headers["guest_id"] as string;

    if (!email || !password) {
      res.json({
        messages: { error: "Email and password are required" },
      });
      return;
    }

    let user = await getUserByEmail(email);

    if (!user || !user.password) {
      res.json({
        messages: { error: "Invalid credentials" },
      });
      return;
    }

    const isPasswordValid = compareSync(password, user?.password as string);

    if (!isPasswordValid) {
      res.json({
        messages: { error: "Password not correct!" },
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    if (guestId) {
      await db.link.updateMany({
        where: { guestId },
        data: { userId: user.id, guestId: null },
      });
    }
    res.json({
      data: user,
      token,
      messages: { success: "Success" },
    });
  } catch (error) {
    res.json({
      messages: { error: "login error" },
    });
  }
};
