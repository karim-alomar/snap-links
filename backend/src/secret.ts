import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY!;
export const BASE_URL = process.env.BASE_URL!;
