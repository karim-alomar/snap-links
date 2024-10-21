interface CommonAnalyticsType {
  key: string;
  visitors: number;
  fill: string;
}

export interface AnalyticsType {
  device: CommonAnalyticsType[];
  browser: CommonAnalyticsType[];
  country: CommonAnalyticsType[];
}
