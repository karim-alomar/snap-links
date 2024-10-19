import { Request, Response } from "express";
import { db } from "../../db";
import { getUserByToken } from "../actions/auth";

export const fetchBrowserStats = async (req: Request, res: Response) => {
  try {
    const token = req.headers["access_token"] as string;

    const user = await getUserByToken(token);

    const analyticsData = await db.linkAnalytics.groupBy({
      by: ["browser"],
      _count: {
        browser: true,
      },
      where: {
        link: {
          userId: user?.id,
        },
      },
    });

    const chartData = analyticsData.map((item) => ({
      browser: item.browser || "Other",
      visitors: item._count.browser,
      fill: `var(--color-${item.browser?.toLowerCase() || "other"})`, // استخدم الألوان المناسبة
    }));

    res.json({
      data: chartData,
      messages: { success: "Success" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};

export const fetchDeviceStats = async (req: Request, res: Response) => {
  try {
    const token = req.headers["access_token"] as string;

    const user = await getUserByToken(token);

    const analyticsData = await db.linkAnalytics.groupBy({
      by: ["device"],
      _count: {
        device: true,
      },
      where: {
        link: {
          userId: user?.id,
        },
      },
    });

    const chartData = analyticsData.map((item) => {
      const device =
        item.device?.toLowerCase() === "unknown" || !item.device
          ? "Other"
          : item.device;

      return {
        device,
        visitors: item._count.device,
        fill: `var(--color-${device.toLowerCase()})`,
      };
    });

    res.json({
      data: chartData,
      messages: { success: "Success" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};

export const fetchCountryStats = async (req: Request, res: Response) => {
  try {
    const token = req.headers["access_token"] as string;

    const user = await getUserByToken(token);

    const analyticsData = await db.linkAnalytics.groupBy({
      by: ["country"],
      _count: {
        country: true,
      },
      where: {
        link: {
          userId: user?.id,
        },
      },
    });

    const chartData = analyticsData.map((item) => ({
      country: item.country || "Other",
      visitors: item._count.country,
      fill: `var(--color-${item.country?.toLowerCase() || "other"})`,
    }));

    res.json({
      data: chartData,
      messages: { success: "Success" },
    });
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};
