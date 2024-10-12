import { Request, Response } from "express";
import { db } from "../../db";
import { getUserByToken } from "../actions/auth";
import { randomUUID } from "../utils/uuid";
import { getLinkById } from "../actions/getLinkById";

export const createLink = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const guestId = req.headers["guest_id"] as string;
    const token = req.headers["access_token"] as string;
    let link;

    if (!url) {
      res.status(400).json({
        messages: { error: "URL is required" },
      });
    }

    // const { shortUrl } = await shortenUrl(url);
    const shortUrl = "foo";
    const user = await getUserByToken(token as string);

    const linkData = {
      shortUrl,
      longUrl: url,
    };
    if (user) {
      link = await db.links.create({
        data: {
          ...linkData,
          userId: user?.id,
        },
      });
    } else {
      const newGuestId = guestId || randomUUID();
      link = await db.links.create({
        data: {
          ...linkData,
          guestId: newGuestId,
        },
      });
    }

    res.json({
      data: link,
      messages: { success: "Link shortened successfully" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};

export const updateLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    if (!url) {
      res.status(400).json({
        messages: { error: "URL is required" },
      });
    }

    // const { shortUrl } = await shortenUrl(url);
    const shortUrl = "foo2";

    const link = await db.links.update({
      where: {
        id: Number(id),
      },
      data: {
        shortUrl,
        longUrl: url,
      },
    });

    res.json({
      data: link,
      messages: { success: "Link updated successfully" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const link = await getLinkById(Number(id));

    if (!link) {
      res.status(400).json({
        messages: {
          success: "The link you are trying to delete does not exist!",
        },
      });
    }

    await db.links.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      messages: { success: "Link deleted successfully" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};
