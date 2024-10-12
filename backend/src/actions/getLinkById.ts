import { db } from "../../db";

export const getLinkById = async (id: number) => {
  try {
    const link = await db.links.findUnique({
      where: {
        id,
      },
    });

    return link;
  } catch (error) {
    return null;
  }
};