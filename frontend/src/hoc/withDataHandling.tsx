import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { authContext } from "@/context";
import { ChartPieIcon, Loader2Icon } from "lucide-react";
import { ComponentType, useContext } from "react";

interface Props {
  useGetDataQuery: any;
  title: string;
  description: string;
}

export const withDataHandling = (WrappedComponent: ComponentType<any>) => {
  return (props: Props & { otherQueries?: Record<string, any> }) => {
    const { useGetDataQuery, title, description } = props;
    const { token } = useContext(authContext);
    const { data, isLoading } = useGetDataQuery(undefined, {
      skip: !token,
    });

    return (
      <Card className="relative flex flex-col min-h-60">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2Icon className="animate-spin" size={35} />
          </div>
        ) : (
          <>
            <CardHeader className="pb-0">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              {data && data.length <= 0 ? (
                <div className="absolute top-0 left-0 bg-white/70 w-full h-full flex items-center justify-center gap-1">
                  <ChartPieIcon />
                  <span>There is no data yet!</span>
                </div>
              ) : (
                <WrappedComponent
                  data={data.data}
                  isLoading={isLoading}
                  {...props}
                />
              )}
            </CardContent>
          </>
        )}
      </Card>
    );
  };
};
