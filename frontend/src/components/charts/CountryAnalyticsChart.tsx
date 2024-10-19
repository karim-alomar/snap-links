import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";
import { authContext } from "@/context";
import { useGetCountryAnalyticsQuery } from "@/store/slices/api/analyticsSlice";
import { generateChartConfig } from "@/utils";
import { ChartPieIcon, Loader2Icon } from "lucide-react";
import { useContext, useMemo } from "react";
import { Label, Legend, Pie, PieChart } from "recharts";

export const CountryAnalyticsChart = () => {
  const { token } = useContext(authContext);
  const { data: chartData, isLoading } = useGetCountryAnalyticsQuery(
    undefined,
    {
      skip: !token,
    }
  );
  const chartConfig = useMemo(() => {
    if (!isLoading) {
      return generateChartConfig(chartData?.data, "country");
    }
  }, [chartData?.data, isLoading]);

  const totalVisitors = useMemo(() => {
    return chartData?.data.reduce((acc, curr) => acc + curr?.visitors, 0);
  }, [chartData]);

  return (
    <Card className="relative flex flex-col min-h-48">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2Icon className="animate-spin" size={35} />
        </div>
      ) : (
        <>
          <CardHeader className="pb-0">
            <CardTitle>Analyzing link traffic by country</CardTitle>
            <CardDescription>
              This chart shows how many users clicked on the links, organized by
              country.
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
                className="mx-auto  max-h-[250px]"
              >
                <PieChart className="w-full">
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
                    data={
                      chartData?.data && chartData?.data.length > 0
                        ? chartData?.data
                        : [
                            {
                              country: "other",
                              visitors: 0,
                              fill: "hsl(var(--chart-6))",
                            },
                          ]
                    }
                    dataKey="visitors"
                    nameKey="country"
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
