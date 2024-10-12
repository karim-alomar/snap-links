import axios from "axios";
import { REBRANDLY_API_KEY, REBRANDLY_ENDPOINT } from "../secret";

export const shortenUrl = async (url: string) => {
  const rebrandlyResponse = await axios.post(
    REBRANDLY_ENDPOINT,
    {
      destination: url,
    },
    {
      headers: {
        "Content-Type": "application/json",
        apikey: REBRANDLY_API_KEY,
      },
    }
  );

  const { shortUrl } = rebrandlyResponse.data;

  return {
    shortUrl,
  };
};
