import { MIN_PASSWORD } from "@/global";
import * as yup from "yup";

export const SignInSchema = yup.object({
  email: yup.string().email().required("auth.email_is_invalid"),
  password: yup
    .string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "The password must contain at least one number.")
    .min(
      MIN_PASSWORD,
      `Password must contain at least ${MIN_PASSWORD} characters.`
    )
    .required(),
});

export type ISignInSchema = yup.InferType<typeof SignInSchema>;
