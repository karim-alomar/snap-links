import { MIN_PASSWORD } from "@/global";
import * as yup from "yup";

export const RegisterFormSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name field is required")
    .required("Name field is required"),
  email: yup.string().email().required("Invalid email"),
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

export type IRegisterFormSchema = yup.InferType<typeof RegisterFormSchema>;
