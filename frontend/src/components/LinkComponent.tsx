import { LinkType } from "@/types";
import { Link } from "lucide-react";

interface Props {
  link: LinkType;
}
export const LinkComponent = ({ link }: Props) => {
  return (
    <a
      href={link.shortUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-600 hover:underline"
    >
      <Link className="w-4 h-4 mr-1" />
      {link.shortUrl}
    </a>
  );
};
