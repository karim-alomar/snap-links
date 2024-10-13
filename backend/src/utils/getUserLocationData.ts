import axios from "axios";
import { IPSTACK_API_KEY } from "../secret";

export const getUserLocationData = async (userIp: string) => {
  const response = await axios.get(
    `http://api.ipstack.com/${userIp}?access_key=${IPSTACK_API_KEY}`
  );
  return response.data;
};
