import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { getUserById } from "../actions/auth";
import { JWT_SECRET_KEY } from "../secret";

export const updateProfile = async (req: Request, res: Response) => {
  const { email, name, password } = await req.body;
  const token = req.headers["authorization"] as string;
  let user;
  let hashPassword;

  const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as {
    userId: string;
  };

  user = await getUserById(decodedToken.userId);

  if (!user) {
    res.status(400).json({
      messages: {
        error: "User not found",
      },
    });
    return;
  }

  if (password) {
    hashPassword = hashSync(password, 10);
  }

  user = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  res.json({
    data: user,
    messages: {
      success: "User profile updated successfully",
    },
  });
};
