import * as jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret";

export const generateJWT = (id: string | number) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
  return token;
};
