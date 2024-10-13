import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SubmitButton,
} from "@/components";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";
import { ILinkShortenerSchema, LinkShortenerSchema } from "@/shcemas";
import {
  updateLinksQueryData,
  useCreateLinkMutation,
  useUpdateLinkMutation,
} from "@/store/slices/api/linkSlice";
import { APIActionResponse, LinkType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { Link } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  linkEditState?: { link?: LinkType; mode: "update" | "create" };
}
export const LinkShortenerForm = ({ linkEditState }: Props) => {
  const { user } = useAppSelector(({ user }) => user);
  const [shortLink, setShortLink] = useState<string>("");
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [createLinkMutation] = useCreateLinkMutation();
  const [updateLinkMutation] = useUpdateLinkMutation();

  const isUpdateble = useMemo(() => {
    return linkEditState?.mode === "update";
  }, [linkEditState?.mode]);

  const getDiffDays = useMemo(() => {
    return dayjs(linkEditState?.link?.expiresAt).diff(dayjs(), "day");
  }, [linkEditState?.link?.expiresAt]);

  const form = useForm<ILinkShortenerSchema>({
    resolver: yupResolver(LinkShortenerSchema),
    defaultValues: {
      url: "",
      expiry_time: null,
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

  useEffect(() => {
    form.reset({
      url: linkEditState?.link?.longUrl,
      expiry_time: getDiffDays,
    });
  }, [form, getDiffDays, linkEditState?.link?.longUrl]);

  const onSubmit: SubmitHandler<ILinkShortenerSchema> = async (value) => {
    const mutation = isUpdateble ? updateLinkMutation : createLinkMutation;
    const res = (await mutation({
      ...value,
      ...(isUpdateble && { id: linkEditState?.link?.id }),
    })) as unknown as APIActionResponse<LinkType>;

    const { data, messages } = res.data;

    if (messages.error) {
      return toast({
        title: "There is an error in the server.",
        variant: "destructive",
      });
    }

    setShortLink(data.shortUrl);
    Cookies.set("guest_id", data.guestId);
    if (isUpdateble) {
      dispatch(
        updateLinksQueryData("fetchLinks", undefined, (draft) => {
          const itemIndex = draft.data.findIndex(
            (item) => item.id === linkEditState?.link?.id
          );
          if (itemIndex !== -1) {
            draft.data[itemIndex] = data;
          }
        })
      );

      toast({
        title: "Link updated successfully",
        variant: "success",
      });
      return;
    }
    dispatch(
      updateLinksQueryData("fetchLinks", undefined, (draft) => {
        draft.data.unshift(data);
      })
    );
    toast({
      title: "Link created successfully",
      variant: "success",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Shorten a Link</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="w-full">
              <InputControl
                control={form.control}
                inputLabel="URL to shorten"
                inputName="url"
                inputPlaceholder="Enter a long URL"
                type="url"
              />
            </div>
            {user && (
              <FormField
                control={form.control}
                name="expiry_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link expiry time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }).map((_, i) => (
                          <SelectItem key={i} value={String(i + 1)}>
                            <span>{`${i + 1} Day`}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <SubmitButton
              title="Shorten"
              isDisabled={!isValid || !isDirty || isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
            />
          </form>
        </Form>
        {shortLink && (
          <a
            href={`https://${shortLink}`}
            target="_blank"
            className="p-2 bg-slate-100 rounded-md mt-3 text-blue-500 flex items-center justify-start gap-1 hover:underline"
          >
            <Link size={15} />
            {shortLink}
          </a>
        )}
      </CardContent>
    </Card>
  );
};
