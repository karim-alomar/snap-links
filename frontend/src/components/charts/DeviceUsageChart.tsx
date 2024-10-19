import { PieChartComponent } from "@/components";
import { withDataHandling } from "@/hoc";
import { useGetDeviceAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { DeviceAnalytics } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";

interface Props {
  data: DeviceAnalytics[];
  isLoading: boolean;
}

const DeviceUsageChart = ({ data, isLoading }: Props) => {
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(data, "device");
    }
  }, [data, isLoading]);

  return (
    <PieChartComponent data={data} chartConfig={chartConfig} nameKey="device" />
  );
};

const EnhancedDeviceUsageChart = withDataHandling(DeviceUsageChart);

export const DeviceUsageChartContainer = () => {
  return (
    <EnhancedDeviceUsageChart
      useGetDataQuery={useGetDeviceAnalyticsQuery}
      title="Devices"
      description="This chart shows how many users clicked on the links, organized by
              device."
    />
  );
};
