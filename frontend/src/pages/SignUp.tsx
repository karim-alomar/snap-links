import {
  AuthCardWrapper,
  Form,
  InputControl,
  SubmitButton,
  ValidationMessage,
} from "@/components";
import { ISignUpSchema, SignUpSchema } from "@/shcemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {
  const [validMessage, setValidMessage] = useState<{
    success?: string | null;
    error?: string | null;
  }>();

  const form = useForm<ISignUpSchema>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isValid, isDirty, isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<ISignUpSchema> = async (value) => {
    console.log(value);

    // const res = (await registerMutation(value)) as APIActionResponse<any>;
    // const { error, success } = res.data.messages;
    // if (error) {
    //   return setValidMessage({ error });
    // }
    // toast({
    //   title: success,
    //   variant: "success",
    // });
    // setOpenOtpModal(true);
    // setCredential({
    //   email: value.email,
    //   password: value.password,
    // });
  };
  return (
    <AuthCardWrapper
      title="Sign Up"
      description="Create an account to start shortening links"
      backButtonHref="sign-in"
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

export default SignUp;
