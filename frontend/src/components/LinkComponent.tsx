import { useAppDispatch, useToast } from "@/hooks";
import {
  updateLinksQueryData,
  useClickLinkMutation,
} from "@/store/slices/api/linkSlice";
import { APIActionResponse, LinkAnalytics, LinkType } from "@/types";
import { Link } from "lucide-react";

interface Props {
  link: LinkType;
}
export const LinkComponent = ({ link }: Props) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [clickLinkMutation] = useClickLinkMutation();

  const handleClickLinkAction = async (id: number) => {
    const res = (await clickLinkMutation({
      id,
    })) as unknown as APIActionResponse<LinkAnalytics>;

    const { messages, data } = res.data;

    if (messages.error) {
      return toast({
        title: "There is an error in the server.",
        variant: "destructive",
      });
    }

    dispatch(
      updateLinksQueryData("fetchLinks", undefined, (draft) => {
        const itemIndex = draft.data.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          draft.data[itemIndex]?.linkAnalytics?.push(data);
        }
      })
    );
  };

  return (
    <a
      href={`https://${link.shortUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-600 hover:underline"
      onClick={() => handleClickLinkAction(link.id)}
    >
      <Link className="w-4 h-4 mr-1" />
      {link.shortUrl}
    </a>
  );
};
