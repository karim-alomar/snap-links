import {
  AuthCardWrapper,
  Form,
  InputControl,
  SubmitButton,
  ValidationMessage,
} from "@/components";
import { useAuth } from "@/hooks";
import { ILoginFormSchema, LoginFormSchema } from "@/shcemas";
import { useLoginMutation } from "@/store/slices/api/authSlice";
import { APIActionResponse, User } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const [validMessage, setValidMessage] = useState<{
    success?: string | null;
    error?: string | null;
  }>();
  const { login } = useAuth();
  const [loginMutation] = useLoginMutation();

  const form = useForm<ILoginFormSchema>({
    resolver: yupResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<ILoginFormSchema> = async (value) => {
    const res = (await loginMutation(
      value
    )) as unknown as APIActionResponse<User>;

    const { messages, data } = res.data;

    if (messages.error) return setValidMessage({ error: messages.error });

    login(data);
  };
  return (
    <AuthCardWrapper
      title="Sign In"
      description="Enter your credentials to access your account"
      backButtonHref="register"
      backButtonLabel="Don't have an account? Sign up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="space-y-4">
              <InputControl
                control={form.control}
                inputName={"email"}
                inputLabel="Email"
                inputPlaceholder="you@example.com"
                isRequired
              />
              <InputControl
                control={form.control}
                inputName={"password"}
                inputLabel="Password"
                inputPlaceholder="*****"
                type="password"
                isRequired
                onChange={(e) => {
                  form.setValue("password", e.target.value);
                  form.trigger("password");
                }}
              />
            </div>
          </div>
          {validMessage && validMessage.error && (
            <ValidationMessage
              validationMessage={{
                error: validMessage.error,
              }}
            />
          )}
          <SubmitButton
            title="Sign in"
            isDisabled={!isValid || !isDirty || isSubmitting}
            isLoading={isSubmitting}
            isSendProtected={!!validMessage?.success}
          />
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default LoginForm;
