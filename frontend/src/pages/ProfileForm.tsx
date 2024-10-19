import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Form,
  InputControl,
  SubmitButton,
} from "@/components";
import { authContext } from "@/context";
import { useAppDispatch, useToast } from "@/hooks";
import { IProfileFormSchema, ProfileFormSchema } from "@/shcemas";
import { updateAuthQueryData } from "@/store/slices/api/authSlice";
import { useUpdateProfileMutation } from "@/store/slices/api/profileSlice";
import { APIActionResponse, User } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileForm = () => {
  const { user } = useContext(authContext);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [updateProfileMutation] = useUpdateProfileMutation();

  const form = useForm<IProfileFormSchema>({
    resolver: yupResolver(ProfileFormSchema) as any,
    mode: "all",
    defaultValues: {
      name: user?.name as string,
      email: user?.email as string,
      password: "",
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<IProfileFormSchema> = async (value) => {
    const res = (await updateProfileMutation({
      ...value,
    })) as unknown as APIActionResponse<User>;

    const { messages, data } = res.data;

    if (messages.error) {
      return toast({
        title: messages.error,
        variant: "destructive",
      });
    }

    dispatch(
      updateAuthQueryData("auth", undefined, (draft) => {
        draft.data = {
          ...draft.data,
          name: data.name,
          email: data.email,
          password: data.password,
        };
      })
    );
    toast({
      title: messages.success,
      variant: "success",
    });
    form.setValue("password", "");
  };
  return (
    <div className="container py-10 px-0 space-y-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto md:w-2/3 w-full shadow-lg">
            <CardHeader className="border-b">
              <span className="text-xl font-semibold">User Information</span>
            </CardHeader>
            <CardContent className="px-0 pt-6">
              <div className="px-6 space-y-7">
                <InputControl
                  control={form.control}
                  inputName={"name"}
                  inputLabel="Name"
                  inputPlaceholder="Enter your name"
                  isRequired
                />
                <InputControl
                  control={form.control}
                  inputName={"email"}
                  inputLabel="Email"
                  inputPlaceholder="Enter your email"
                />
                <InputControl
                  control={form.control}
                  inputName={"password"}
                  inputLabel="Password"
                  inputPlaceholder="Enter new password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <SubmitButton
                title="Edit Profile"
                isDisabled={!isValid || !isDirty || isSubmitting}
                isLoading={isSubmitting}
                className="w-fit"
                size="lg"
              />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
