import { PieChartComponent } from "@/components";
import { withDataHandling } from "@/hoc";
import { useGetBrowserAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { BrowserAnalytics } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";

interface Props {
  data: BrowserAnalytics[];
  isLoading: boolean;
}

const BrowserUsageChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data, "browser");
    }
  }, [data, isLoading]);

  return (
    <PieChartComponent
      data={data}
      chartConfig={chartConfig}
      nameKey="browser"
    />
  );
};

const EnhancedBrowserUsageChart = withDataHandling(BrowserUsageChart);

export const BrowserUsageChartContainer = () => {
  return (
    <EnhancedBrowserUsageChart
      useGetDataQuery={useGetBrowserAnalyticsQuery}
      title="Browsers"
      description="This chart shows how many users clicked on the links, organized by
              browser."
    />
  );
};
