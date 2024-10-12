import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { getUserByEmail } from "../actions/auth";
import { db } from "../../db";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const guestId = req.headers["guest_id"] as string;

    let user = await getUserByEmail(email);

    if (user) {
      res.json({
        messages: { error: "User already exists" },
      });
    }

    const hashPassword = hashSync(password, 10);

    user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        accessToken: jwt.sign(
          {
            userId: user?.id,
          },
          JWT_SECRET_KEY
        ),
      },
    });

    if (guestId) {
      await db.links.updateMany({
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
    }

    let user = await getUserByEmail(email);

    if (!user || !user.password) {
      res.json({
        messages: { error: "Invalid credentials" },
      });
    }

    const isPasswordValid = compareSync(password, user?.password as string);

    if (!isPasswordValid) {
      res.json({
        messages: { error: "Password not correct!" },
      });
    }

    const token = jwt.sign(
      {
        userId: user?.id,
      },
      JWT_SECRET_KEY
    );

    user = await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        accessToken: token,
      },
    });

    if (guestId) {
      await db.links.updateMany({
        where: { guestId },
        data: { userId: user.id, guestId: null },
      });
    }
    res.json({
      data: user,
      messages: { success: "Success" },
    });
  } catch (error) {
    res.json({
      messages: { error: "login error" },
    });
  }
};
