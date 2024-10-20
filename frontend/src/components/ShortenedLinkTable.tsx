import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LinkComponent,
  LinkDetailsModal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { authContext } from "@/context";
import { useAppDispatch, useToast } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  updateLinksQueryData,
  useDeleteLinkMutation,
  useFetchLinksQuery,
} from "@/store/slices/api/linkSlice";
import { APIActionResponse, LinkType, MessagesType } from "@/types";
import dayjs from "dayjs";
import { BarChart, Copy, Edit, Eye, Loader2, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";
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
  const { user } = useContext(authContext);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { data: links } = useFetchLinksQuery();
  const [deleteLinkMutation, { isLoading }] = useDeleteLinkMutation();

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Text copied successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Failed to copy text: ${error}`,
        variant: "success",
      });
    }
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
    (links?.data?.length as number) > 0 && (
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {links?.data.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <LinkComponent link={link} />
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
                    <>
                      <TableCell>
                        <span>
                          {link?.expiresAt
                            ? `${dayjs(link?.expiresAt).format("DD-MM-YYYY")}`
                            : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-white rounded-full py-1 px-2",
                            link.status === "Expired"
                              ? "bg-destructive"
                              : "bg-green-500"
                          )}
                        >
                          {link.status}
                        </span>
                      </TableCell>
                    </>
                  )}
                  <TableCell className="flex items-center justify-start gap-2 h-24">
                    <LinkDetailsModal link={link}>
                      <Button variant="outline" size="icon">
                        <Eye size={18} />
                      </Button>
                    </LinkDetailsModal>
                    <Button
                      onClick={() => handleCopyText(link.shortUrl)}
                      size="icon"
                      variant="outline"
                    >
                      <Copy size={18} />
                    </Button>
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
