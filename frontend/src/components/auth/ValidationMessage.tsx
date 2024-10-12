import { Alert, AlertTitle } from "@/components";
import { Terminal } from "lucide-react";
import { ReactNode, useMemo } from "react";

interface Props {
  validationMessage: {
    error?: string | null;
    success?: string | null;
  };
  children?: ReactNode;
}

export const ValidationMessage = ({ validationMessage, children }: Props) => {
  const messages = useMemo(() => {
    return validationMessage;
  }, [validationMessage]);

  return (
    <Alert
      variant={messages.error ? "destructive" : "success"}
      className="mt-4"
    >
      <Terminal className="h-4 w-4" />
      <AlertTitle className="m-0 leading-6">
        {messages.error || messages.success}
        {children}
      </AlertTitle>
    </Alert>
  );
};
