import { MIN_PASSWORD } from "@/global";
import * as yup from "yup";

export const ProfileFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "The password must contain at least one number.")
    .min(
      MIN_PASSWORD,
      `Password must contain at least ${MIN_PASSWORD} characters.`
    ),
});

export type IProfileFormSchema = yup.InferType<typeof ProfileFormSchema>;
