import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  InputControl,
  SubmitButton,
} from "@/components";
import { ILinkShortenerSchema, LinkShortenerSchema } from "@/shcemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export const LinkShortenerForm = () => {
  const form = useForm<ILinkShortenerSchema>({
    resolver: yupResolver(LinkShortenerSchema),
    defaultValues: {
      url: "",
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<ILinkShortenerSchema> = async (value) => {
    console.log(value);
  };
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Shorten a Link</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-2"
          >
            <div className="w-full">
              <InputControl
                control={form.control}
                inputName="url"
                inputPlaceholder="Enter a long URL"
                type="url"
              />
            </div>
            <SubmitButton
              title="Shorten"
              isDisabled={!isValid || !isDirty || isSubmitting}
              isLoading={isSubmitting}
              className="w-fit h-11"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
