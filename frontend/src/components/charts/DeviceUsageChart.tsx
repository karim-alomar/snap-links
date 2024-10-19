import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";
import { withDataHandling } from "@/hoc";
import { useGetDeviceAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { DeviceAnalytics } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

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

  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr?.visitors, 0);
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="left"
          iconType="circle"
        />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="device"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors?.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
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
