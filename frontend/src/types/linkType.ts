import { User } from "@/types";

export interface LinkType {
  id: number;
  userId: number;
  guestId: string;
  shortUrl: string;
  longUrl: string;
  user: User;
  linkAnalytics: LinkAnalytics[];
  expiresAt?: Date;
  status?: "Expired" | "Active";
  updatedAt: Date;
  createdAt: Date;
}

export interface LinkAnalytics {
  id: number;
  linkId: number;
  countryCode?: string;
  country?: string;
  timezone?: string;
  city?: string;
  region?: string;
  browser?: string;
  device?: string;
  link?: LinkType;
  updatedAt: Date;
  createdAt: Date;
}
