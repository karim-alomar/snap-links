import { db } from "../../../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
