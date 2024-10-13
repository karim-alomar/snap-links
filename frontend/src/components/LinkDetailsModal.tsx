import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { LinkAnalytics, LinkType } from "@/types";
import { ReactNode } from "react";

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Link Details</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};
