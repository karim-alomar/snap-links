import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  isLoading?: boolean;
  isDisabled?: boolean;
  title: string;
  className?: string;
  isSendProtected?: boolean;
  size?: "default" | "icon" | "sm" | "lg";
}
export const SubmitButton = ({
  title,
  isLoading,
  isDisabled,
  className,
  isSendProtected,
  size,
}: Props) => {
  return (
    <Button
      type="submit"
      disabled={isDisabled || isSendProtected}
      size={size ?? "default"}
      className={cn("w-full", className)}
      onClick={(e) => {
        if (isSendProtected || isDisabled) {
          e.preventDefault();
        }
      }}
    >
      {isLoading ? (
        <>
          <p>Please Wait</p>
          <Loader2 className="ms-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
