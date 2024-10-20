import { Request, Response } from "express";
import { Details } from "express-useragent";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { getUserById } from "../actions/auth";
import { getLinkById, getLinkByLinkId } from "../actions/linkHandlers";
import { BASE_URL, JWT_SECRET_KEY } from "../secret";
import {
  fetchUserGeoLocation,
  generateShortLink,
  getDeviceType,
  randomUUID,
} from "../utils";

export const fetchLinks = async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guest_id"] as string;
    const token = req.headers["authorization"] as string;

    if (token) {
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as {
        userId: string;
      };
      const user = await getUserById(decodedToken.userId);
      const links = await db.link.findMany({
        where: {
          userId: user?.id,
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

      res.status(200).json({
        data: links.map((link) => ({
          ...link,
          status:
            new Date(link?.expiresAt as Date) > new Date() || !link?.expiresAt
              ? "Active"
              : "Expired",
        })),
      });
      return;
    }

    if (guestId) {
      const links = await db.link.findMany({
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

      res.json({
        data: links,
      });
      return;
    }

    res.json({
      data: [],
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
    const token = req.headers["authorization"] as string;

    if (!url) {
      res.status(400).json({
        messages: { error: "URL is required" },
      });
      return;
    }

    const uniqLinkId = generateShortLink();

    const linkData = {
      shortUrl: `${BASE_URL}/${uniqLinkId}`,
      longUrl: url,
      linkId: uniqLinkId,
    };

    if (token) {
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as {
        userId: string;
      };
      const user = await getUserById(decodedToken.userId);
      const link = await db.link.create({
        data: {
          ...linkData,
          userId: user?.id,
          expiresAt: expiry_time,
        },
        include: {
          linkAnalytics: true,
        },
      });

      res.json({
        data: link,
        messages: { success: "Link shortened successfully" },
      });
      return;
    }

    const newGuestId = guestId || randomUUID();

    const link = await db.link.create({
      data: {
        ...linkData,
        guestId: newGuestId,
      },
      include: {
        linkAnalytics: true,
      },
    });

    res.json({
      data: link,
      messages: { success: "Link shortened successfully" },
    });
    return;
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
    const locationData = await fetchUserGeoLocation(ip as string);

    await db.linkAnalytics.create({
      data: {
        linkId: Number(link?.id),
        countryCode: locationData?.country_code,
        country: locationData?.country_name,
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
