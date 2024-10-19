interface CommonAnalyticsType {
  visitors: number;
  fill: string;
}

export interface BrowserAnalytics extends CommonAnalyticsType {
  browser: string;
}

export interface DeviceAnalytics extends CommonAnalyticsType {
  device: string;
}

export interface CountryAnalytics extends CommonAnalyticsType {
  country: string;
}
