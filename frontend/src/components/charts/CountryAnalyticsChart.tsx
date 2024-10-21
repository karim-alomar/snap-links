import { PieChartComponent } from "@/components";
import { withDataHandling } from "@/hoc";
import { useFetchAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { AnalyticsType } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";

interface Props {
  data: AnalyticsType;
  isLoading: boolean;
}

const CountryAnalyticsChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data.country);
    }
  }, [data, isLoading]);

  return <PieChartComponent data={data.country} chartConfig={chartConfig} />;
};

const EnhancedCountryAnalyticsChart = withDataHandling(CountryAnalyticsChart);

export const CountryAnalyticsChartContainer = () => {
  return (
    <EnhancedCountryAnalyticsChart
      useGetDataQuery={useFetchAnalyticsQuery}
      title="Top Countries"
      description="This chart shows how many users clicked on the links, organized by
              country."
    />
  );
};
