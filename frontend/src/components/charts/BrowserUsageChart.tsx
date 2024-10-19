import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";
import { withDataHandling } from "@/hoc";
import { useGetBrowserAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { BrowserAnalytics } from "@/types";
import { generateChartConfig } from "@/utils";
import { useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

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
          nameKey="browser"
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
