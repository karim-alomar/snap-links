import {
  AuthCardWrapper,
  Form,
  InputControl,
  SubmitButton,
} from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema, ISignInSchema } from "@/shcemas";
import { useState } from "react";

const SignIn = () => {
  const [validMessage, setValidMessage] = useState<{
    success?: string | null;
    error?: string | null;
  }>();

  const form = useForm<ISignInSchema>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<ISignInSchema> = async (value) => {
    console.log(value);

    // TODO: For Testing
    setValidMessage({ success: "success" });
  };
  return (
    <AuthCardWrapper
      title="Sign In"
      description="Enter your credentials to access your account"
      backButtonHref="sign-up"
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
          <SubmitButton
            title="Sign in"
            isDisabled={!isValid || !isDirty || isSubmitting}
            isLoading={isSubmitting}
            isSendProtected={!!validMessage?.success}
            // && ((validMessage.success?.length > 0) as boolean)
          />
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default SignIn;
