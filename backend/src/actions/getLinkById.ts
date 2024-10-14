import { db } from "../../db";

export const getLinkById = async (id: number) => {
  try {
    const link = await db.link.findUnique({
      where: {
        id,
      },
    });

    return link;
  } catch (error) {
    return null;
  }
};

export const getLinkByCode = async (code: string) => {
  try {
    const link = await db.link.findUnique({
      where: {
        code,
      },
    });

    return link;
  } catch (error) {
    return null;
  }
};
