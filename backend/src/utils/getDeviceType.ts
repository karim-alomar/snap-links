import { DeviceType } from "../types";

export const getDeviceType = (ua: DeviceType) => {
  switch (true) {
    case ua.isMobile:
      return "Mobile";
    case ua.isTablet:
      return "Tablet";
    case ua.isAndroidTablet:
      return "Android Tablet";
    case ua.isDesktop:
      return "Desktop";
    case ua.isSmartTV:
      return "Smart TV";
    case ua.isBot:
      return "Bot";
    case ua.isCurl:
      return "Curl Client";
    default:
      return "Unknown";
  }
};
