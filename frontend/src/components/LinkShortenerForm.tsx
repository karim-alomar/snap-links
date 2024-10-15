import {
  Button,
  Calendar,
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
  LinkComponent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SubmitButton,
} from "@/components";
import { authContext } from "@/context";
import { useAppDispatch, useToast } from "@/hooks";
import { cn } from "@/lib/utils";
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
import { CalendarIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  linkEditState?: { link?: LinkType; mode: "update" | "create" };
}

export const LinkShortenerForm = ({ linkEditState }: Props) => {
  const { user } = useContext(authContext);
  const [link, setLink] = useState<LinkType>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [createLinkMutation] = useCreateLinkMutation();
  const [updateLinkMutation] = useUpdateLinkMutation();

  const isUpdateble = useMemo(() => {
    return linkEditState?.mode === "update";
  }, [linkEditState?.mode]);

  const form = useForm<ILinkShortenerSchema>({
    resolver: yupResolver(LinkShortenerSchema),
    defaultValues: {
      url: "",
      expiry_time: null,
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

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

    setLink(data);
    if (!user) {
      Cookies.set("guest_id", data.guestId);
    }
    if (isUpdateble) {
      dispatch(
        updateLinksQueryData("fetchLinks", undefined, (draft) => {
          const itemIndex = draft.data.findIndex(
            (item) => item.id === linkEditState?.link?.id
          );
          if (itemIndex !== -1) {
            draft.data[itemIndex] = {
              ...data,
              status: "Active",
            };
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
        draft.data.unshift({
          ...data,
          status: "Active",
        });
      })
    );
    toast({
      title: "Link created successfully",
      variant: "success",
    });
  };

  useEffect(() => {
    form.reset({
      url: linkEditState?.link?.longUrl,
      expiry_time: linkEditState?.link?.expiresAt,
    });
  }, [form, linkEditState?.link]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Shorten a Link</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-3 items-end"
          >
            <div
              className={cn(
                "col-span-12",
                user ? "lg:col-span-9" : "lg:col-span-11"
              )}
            >
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
                  <FormItem className="lg:col-span-2 col-span-12 flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            size="lg"
                            className={cn(
                              "px-3 h-[46px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format("DD-MM-YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          disabled={(date) => date <= new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <SubmitButton
              title="Shorten"
              isDisabled={!isValid || !isDirty || isSubmitting}
              isLoading={isSubmitting}
              className="lg:col-span-1 col-span-12 h-[46px]"
            />
          </form>
        </Form>
        {link && (
          <div className="p-3 bg-blue-50 rounded-md mt-3">
            <LinkComponent link={link} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
