import * as yup from "yup";

export const LinkShortenerSchema = yup.object({
  url: yup.string().url().required(),
  expiry_time: yup.date().nullable(),
});

export type ILinkShortenerSchema = yup.InferType<typeof LinkShortenerSchema>;
