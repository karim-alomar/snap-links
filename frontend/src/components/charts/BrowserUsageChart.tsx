import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";
import { authContext } from "@/context";
import { withDataHandling } from "@/hoc";
import { useGetBrowserAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { generateChartConfig } from "@/utils";
import { useContext, useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

const BrowserUsageChart = () => {
  const { token } = useContext(authContext);
  const { data: chartData, isLoading } = useGetBrowserAnalyticsQuery(
    undefined,
    {
      skip: !token,
    }
  );

  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(chartData?.data, "browser");
    }
  }, [chartData?.data, isLoading]);

  const totalVisitors = useMemo(() => {
    return chartData?.data.reduce((acc, curr) => acc + curr?.visitors, 0);
  }, [chartData]);

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
          data={chartData?.data}
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
  const { token } = useContext(authContext);
  const { data: chartData, isLoading } = useGetBrowserAnalyticsQuery(
    undefined,
    {
      skip: !token,
    }
  );

  return (
    <EnhancedBrowserUsageChart
      isLoading={isLoading}
      data={chartData?.data}
      title="Browsers"
      description="This chart shows how many users clicked on the links, organized by
              browser."
    />
  );
};
