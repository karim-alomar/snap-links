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

const DeviceUsageChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data.device);
    }
  }, [data, isLoading]);

  return <PieChartComponent data={data.device} chartConfig={chartConfig} />;
};

const EnhancedDeviceUsageChart = withDataHandling(DeviceUsageChart);

export const DeviceUsageChartContainer = () => {
  return (
    <EnhancedDeviceUsageChart
      useGetDataQuery={useFetchAnalyticsQuery}
      title="Devices"
      description="This chart shows how many users clicked on the links, organized by
              device."
    />
  );
};
