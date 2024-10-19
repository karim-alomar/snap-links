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

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    return `hsl(var(--chart-${randomIndex}))`;
  };

  uniqueKeys.forEach((item: any) => {
    chartConfig[item] = {
      label: item.charAt(0).toUpperCase() + item.slice(1),
      color: generateRandomColor(),
    };
  });

  return chartConfig;
};
