import { LinkType } from "@/types";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  Links: LinkType;
  updatedAt: Date;
  createdAt: Date;
}
