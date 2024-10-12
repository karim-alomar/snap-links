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

export const getUserByToken = async (accessToken?: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        accessToken,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
