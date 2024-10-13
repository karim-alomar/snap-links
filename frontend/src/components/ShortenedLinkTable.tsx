import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LinkDetailsModal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";
import {
  updateLinksQueryData,
  useClickLinkMutation,
  useDeleteLinkMutation,
  useFetchLinksQuery,
} from "@/store/slices/api/linkSlice";
import {
  APIActionResponse,
  LinkAnalytics,
  LinkType,
  MessagesType,
} from "@/types";
import dayjs from "dayjs";
import { BarChart, Edit, Eye, Link, Loader2, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";
import QRCode from "react-qr-code";

interface Props {
  setLinkEditState?: Dispatch<
    SetStateAction<{
      link?: LinkType;
      mode: "update" | "create";
    }>
  >;
}
export const ShortenedLinkTable = ({ setLinkEditState }: Props) => {
  const { user } = useAppSelector(({ user }) => user);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { data: links } = useFetchLinksQuery();
  const [deleteLinkMutation, { isLoading }] = useDeleteLinkMutation();
  const [clickLinkMutation] = useClickLinkMutation();

  const getDiffDays = useMemo(
    () => (expiresAt?: Date) => {
      return dayjs(expiresAt).diff(dayjs(), "day");
    },
    []
  );

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

  const handleDelete = async (id: number) => {
    const res = (await deleteLinkMutation({
      id,
    })) as unknown as APIActionResponse<MessagesType>;
    const { error } = res.data.messages;

    if (error) {
      return toast({
        title: "There is an error in the server.",
        variant: "destructive",
      });
    }

    dispatch(
      updateLinksQueryData("fetchLinks", undefined, (draft) => {
        draft.data = draft.data.filter((link) => link.id !== id);
      })
    );
    toast({
      title: `#${id} Link deleted successfully`,
      variant: "success",
    });
  };

  return (
    (links?.data.length as number) > 0 && (
      <Card>
        <CardHeader>
          <CardTitle>Your Shortened Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short Link</TableHead>
                <TableHead>Original Link</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>QR code</TableHead>
                {user && (
                  <>
                    <TableHead>Expiry time</TableHead>
                    <TableHead>Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {links?.data.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {link.longUrl}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BarChart className="w-4 h-4 mr-1" />
                      {link?.linkAnalytics?.length ?? 0} clicks
                    </div>
                  </TableCell>
                  <TableCell>
                    <QRCode value={link.shortUrl} size={80} />
                  </TableCell>
                  {user && (
                    <TableCell>
                      <span>
                        {getDiffDays(link?.expiresAt)
                          ? `${getDiffDays(link?.expiresAt)} Days`
                          : "N/A"}
                      </span>
                    </TableCell>
                  )}
                  <TableCell className="flex items-center justify-start gap-2 h-24">
                    <LinkDetailsModal link={link}>
                      <Button variant="outline" size="icon">
                        <Eye size={18} />
                      </Button>
                    </LinkDetailsModal>
                    {user && (
                      <>
                        <Button
                          onClick={() =>
                            setLinkEditState?.({
                              link,
                              mode: "update",
                            })
                          }
                          size="icon"
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(link.id)}
                          variant="destructive"
                          size="icon"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash size={18} />
                          )}
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  );
};
