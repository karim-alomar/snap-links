import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import { db } from "../../db";
import { getUserByToken } from "../actions/auth";

export const updateProfile = async (req: Request, res: Response) => {
  const { email, name, password } = await req.body;
  const token = req.headers["access_token"] as string;
  let user;
  let hashPassword;

  user = await getUserByToken(token);

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
