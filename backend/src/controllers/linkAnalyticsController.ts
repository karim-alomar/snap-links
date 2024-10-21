import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { db } from "../../db";
import { getUserById } from "../actions/auth";
import { JWT_SECRET_KEY } from "../secret";

export const fetchAnalytics = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"] as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as {
      userId: string;
    };
    const user = await getUserById(decodedToken.userId);

    const fetchAnalyticsData = async (
      nameKey: keyof typeof Prisma.LinkAnalyticsScalarFieldEnum
    ) => {
      return await db.linkAnalytics.groupBy({
        by: [nameKey],
        _count: { [nameKey]: true },
        where: { link: { userId: user?.id } },
      });
    };

    const browserData = await fetchAnalyticsData("browser");
    const countryData = await fetchAnalyticsData("country");
    const deviceData = await fetchAnalyticsData("device");

    const formatChartData = (
      data: (Prisma.PickEnumerable<
        Prisma.LinkAnalyticsGroupByOutputType,
        any[]
      > & {
        _count: {
          [key: string]: number;
        };
      })[],
      nameKey: string
    ) => {
      return data.map((item) => ({
        key: item[nameKey] || "Other",
        visitors: item._count[nameKey],
        fill: `var(--color-${item[nameKey]?.toLowerCase() || "other"})`,
      }));
    };

    const chartData = {
      browser: formatChartData(browserData, "browser"),
      country: formatChartData(countryData, "country"),
      device: formatChartData(deviceData, "device"),
    };

    res.json({
      data: chartData,
      messages: { success: "Success" },
    });
    return;
  } catch (error: any) {
    res.json({
      messages: { error: error.message },
    });
  }
};
