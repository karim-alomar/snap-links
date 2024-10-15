import { Link } from "@prisma/client";
import { Request, Response } from "express";
import { Details } from "express-useragent";
import { db } from "../../db";
import { getUserByToken } from "../actions/auth";
import { getLinkById, getLinkByLinkId } from "../actions/linkHandlers";
import { BASE_URL } from "../secret";
import {
  generateShortLink,
  getDeviceType,
  getUserLocationData,
  randomUUID,
} from "../utils";

export const fetchLinks = async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guest_id"] as string;
    const token = req.headers["access_token"] as string;
    let links: Link[] = [];

    const user = await getUserByToken(token as string);

    if (user) {
      links = await db.link.findMany({
        where: {
          userId: user.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          linkAnalytics: true,
        },
      });
    } else {
      if (guestId) {
        links = await db.link.findMany({
          where: {
            guestId,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          include: {
            linkAnalytics: true,
          },
        });
      }
    }
    links = links.map((link) => ({
      ...link,
      status:
        new Date(link?.expiresAt as Date) > new Date() || !link?.expiresAt
          ? "Active"
          : "Expired",
    }));
    res.json({
      data: links,
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};

export const createLink = async (req: Request, res: Response) => {
  try {
    const { url, expiry_time } = req.body;
    const guestId = req.headers["guest_id"] as string;
    const token = req.headers["access_token"] as string;
    let link;

    if (!url) {
      res.status(400).json({
        messages: { error: "URL is required" },
      });
      return;
    }

    const uniqLinkId = generateShortLink();
    const user = await getUserByToken(token as string);

    const linkData = {
      shortUrl: `${BASE_URL}/${uniqLinkId}`,
      longUrl: url,
      linkId: uniqLinkId,
    };

    if (user) {
      link = await db.link.create({
        data: {
          ...linkData,
          userId: user?.id,
          expiresAt: expiry_time,
        },
        include: {
          linkAnalytics: true,
        },
      });
    } else {
      const newGuestId = guestId || randomUUID();

      link = await db.link.create({
        data: {
          ...linkData,
          guestId: newGuestId,
        },
        include: {
          linkAnalytics: true,
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
    const { url, expiry_time } = req.body;

    if (!url) {
      res.status(400).json({
        messages: { error: "URL is required" },
      });
      return;
    }

    const link = await db.link.update({
      where: {
        id: Number(id),
      },
      data: {
        longUrl: url,
        expiresAt: expiry_time,
      },
      include: {
        linkAnalytics: true,
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
      res.json({
        messages: {
          success: "The link you are trying to delete does not exist!",
        },
      });
      return;
    }

    await db.link.delete({
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

export const linkTracking = async (req: Request, res: Response) => {
  try {
    const { linkId } = req.params;
    const userAgent = req.useragent as Details;
    const deviceType = getDeviceType(userAgent);
    const link = await getLinkByLinkId(linkId);

    const linkIsExpired = new Date(link?.expiresAt as Date) < new Date();

    if (!link || (!!link?.expiresAt && linkIsExpired)) {
      res.send("The link you want to access does not exist.");
      return;
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const locationData = await getUserLocationData(ip as string);

    await db.linkAnalytics.create({
      data: {
        linkId: Number(link?.id),
        country: locationData?.country_code,
        city: locationData?.city,
        region: locationData?.region_name,
        browser: userAgent?.browser,
        device: deviceType,
      },
    });

    res.redirect((link?.longUrl as string) ?? "");
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};
