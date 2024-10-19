export const generateChartConfig = (data: any, key: string) => {
  const uniqueKeys = Array.from(
    new Set(
      data?.map((item: any) => item?.[key]?.toLowerCase().replace(" ", "_"))
    )
  );

  const chartConfig:
    | {
        [key: string]: {
          lable: string;
          color: string;
        };
      }
    | any = {};

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
    "hsl(var(--chart-9))",
    "hsl(var(--chart-10))",
  ];

  uniqueKeys.forEach((item: any, index) => {
    chartConfig[item] = {
      label: item.charAt(0).toUpperCase() + item.slice(1),
      color: colors[index % colors.length],
    };
  });

  return chartConfig;
};
