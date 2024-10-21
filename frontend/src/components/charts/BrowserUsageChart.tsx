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

const BrowserUsageChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data.browser);
    }
  }, [data.browser, isLoading]);

  return <PieChartComponent data={data.browser} chartConfig={chartConfig} />;
};

const EnhancedBrowserUsageChart = withDataHandling(BrowserUsageChart);

export const BrowserUsageChartContainer = () => {
  return (
    <EnhancedBrowserUsageChart
      useGetDataQuery={useFetchAnalyticsQuery}
      title="Browsers"
      description="This chart shows how many users clicked on the links, organized by
              browser."
    />
  );
};
