import * as yup from "yup";

export const LinkShortenerSchema = yup.object({
  url: yup.string().url().required(),
});

export type ILinkShortenerSchema = yup.InferType<typeof LinkShortenerSchema>;
