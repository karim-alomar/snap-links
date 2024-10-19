import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";
import { authContext } from "@/context";
import { useGetDeviceAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { ChartPieIcon, Loader2Icon } from "lucide-react";
import { useContext, useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

export const DeviceUsageChart = () => {
  const { token } = useContext(authContext);
  const { data: chartData, isLoading } = useGetDeviceAnalyticsQuery(undefined, {
    skip: !token,
  });

  const chartConfig = {
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-5))",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-4))",
    },
    tablet: {
      label: "Tablet",
      color: "hsl(var(--chart-3))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartData?.data.reduce((acc, curr) => acc + curr?.visitors, 0);
  }, [chartData]);

  return (
    <Card className="relative flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2Icon className="animate-spin" size={35} />
        </div>
      ) : (
        <>
          <CardHeader className="pb-0">
            <CardTitle>Analyzing link traffic by device</CardTitle>
            <CardDescription>
              This chart shows how many users clicked on the links, organized by
              device.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {chartData?.data && chartData?.data.length <= 0 ? (
              <div className="absolute top-0 left-0 bg-white/70 w-full h-full flex items-center justify-center gap-1">
                <ChartPieIcon />
                <span>There is no data yet!</span>
              </div>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData?.data}
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
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};
