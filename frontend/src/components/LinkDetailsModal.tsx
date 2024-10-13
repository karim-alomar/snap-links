import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { LinkAnalytics, LinkType } from "@/types";
import { ReactNode, useMemo } from "react";
import WorldMap from "react-svg-worldmap";

interface Props {
  children: ReactNode;
  link: LinkType;
}
export const LinkDetailsModal = ({ children, link }: Props) => {
  const displayKeys: {
    label: string;
    key: keyof Pick<LinkAnalytics, "browser" | "country" | "device">;
  }[] = [
    { label: "Country", key: "country" },
    { label: "Device", key: "device" },
    { label: "Browser", key: "browser" },
  ];

  const mapData = useMemo(() => {
    const countryClickCounts = link?.linkAnalytics?.reduce<
      Record<string, number>
    >((accumulator, analyticsItem) => {
      const countryName = analyticsItem.country;

      if (countryName) {
        accumulator[countryName] = (accumulator[countryName] || 0) + 1;
      }
      return accumulator;
    }, {});

    return link?.linkAnalytics?.map((item) => {
      const country = item.country;
      return {
        country: country as string,
        value: countryClickCounts[country as string] || 0,
      };
    });
  }, [link?.linkAnalytics]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Link Details</DialogTitle>
        </DialogHeader>
        {link?.linkAnalytics?.length === 0 ? (
          <span className="text-center py-10 text-black/50">
            <span className="text-2xl">⚠️</span> There are no details
          </span>
        ) : (
          <>
            <WorldMap
              color="#f97316"
              value-suffix="people"
              size="responsive"
              data={mapData ?? []}
            />
            {link?.linkAnalytics?.map((item) => (
              <div key={item.id} className="border shadow-md p-3">
                <div className="grid grid-cols-3 gap-3">
                  {displayKeys.map(({ label, key }) => (
                    <div
                      key={key}
                      className="flex flex-col items-start justify-start"
                    >
                      <span className="text-black/50">{label}:</span>
                      <span>{item[key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
