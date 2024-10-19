import { PieChartComponent } from "@/components";
import { withDataHandling } from "@/hoc";
import { useGetCountryAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { CountryAnalytics } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";

interface Props {
  data: CountryAnalytics[];
  isLoading: boolean;
}

const CountryAnalyticsChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data, "country");
    }
  }, [data, isLoading]);

  return (
    <PieChartComponent
      data={data}
      chartConfig={chartConfig}
      nameKey="country"
    />
  );
};

const EnhancedCountryAnalyticsChart = withDataHandling(CountryAnalyticsChart);

export const CountryAnalyticsChartContainer = () => {
  return (
    <EnhancedCountryAnalyticsChart
      useGetDataQuery={useGetCountryAnalyticsQuery}
      title="Top Countries"
      description="This chart shows how many users clicked on the links, organized by
              country."
    />
  );
};
