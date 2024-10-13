import {
  AuthCardWrapper,
  Form,
  InputControl,
  SubmitButton,
  ValidationMessage,
} from "@/components";
import { useAuth } from "@/hooks";
import { IRegisterFormSchema, RegisterFormSchema } from "@/shcemas";
import { useRegisterMutation } from "@/store/slices/api/authSlice";
import { APIActionResponse, User } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const [validMessage, setValidMessage] = useState<{
    success?: string | null;
    error?: string | null;
  }>();
  const { login } = useAuth();
  const [registerMutation] = useRegisterMutation();

  const form = useForm<IRegisterFormSchema>({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<IRegisterFormSchema> = async (value) => {
    const res = (await registerMutation(
      value
    )) as unknown as APIActionResponse<User>;
    const { messages, data } = res.data;

    if (messages.error) return setValidMessage({ error: messages.error });

    login(data);
  };
  return (
    <AuthCardWrapper
      title="Sign Up"
      description="Create an account to start shortening links"
      backButtonHref="login"
      backButtonLabel="Already have an account? Sign in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="space-y-4">
              <InputControl
                control={form.control}
                inputName={"name"}
                inputLabel="Name"
                inputPlaceholder="John Doe"
                isRequired
              />
              <InputControl
                control={form.control}
                inputName={"email"}
                inputLabel="Email"
                inputPlaceholder="you@example.com"
                type="email"
                isRequired
              />
              <InputControl
                control={form.control}
                inputName={"password"}
                inputLabel="Password"
                inputPlaceholder="****"
                type="password"
                isRequired
                onChange={(e) => {
                  form.setValue("password", e.target.value);
                  form.trigger("password");
                }}
              />
            </div>
          </div>
          {validMessage && validMessage?.error && (
            <ValidationMessage
              validationMessage={{
                error: validMessage?.error,
              }}
            />
          )}

          <SubmitButton
            title="Sign up"
            isDisabled={!isValid || !isDirty || isSubmitting}
            isLoading={isSubmitting}
            isSendProtected={!!validMessage?.success}
          />
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default RegisterForm;
