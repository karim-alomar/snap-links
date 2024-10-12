import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  InputLabel,
} from "@/components";
import { Eye, EyeOff } from "lucide-react";
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { Control } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  inputName: string;
  isRequired?: boolean;
  inputLabel?: string;
  inputDescription?: string;
  inputPlaceholder?: string;
  iconPrepend?: ReactNode;
  iconAppend?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputControl = forwardRef<HTMLInputElement, Props>(
  (
    {
      control,
      inputName,
      isRequired,
      inputLabel,
      inputDescription,
      inputPlaceholder,
      iconPrepend,
      iconAppend,
      onChange,
      ...props
    }: Props,
    ref
  ) => {
    const [displayPassword, setDisplayPassword] = useState(false);
    return (
      <FormField
        control={control}
        name={inputName}
        render={({ field }) => (
          <FormItem>
            {inputLabel && (
              <div className="flex flex-col items-start justify-start gap-2">
                <div className="flex items-center justify-start gap-2">
                  <InputLabel isRequired={isRequired}>{inputLabel}</InputLabel>
                </div>
                {inputDescription && (
                  <FormDescription>{inputDescription}</FormDescription>
                )}
              </div>
            )}
            <FormControl>
              <Input
                placeholder={inputPlaceholder}
                {...field}
                {...props}
                ref={ref}
                iconAppend={
                  props.type === "password" ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDisplayPassword((prev) => !prev);
                      }}
                    >
                      {displayPassword ? (
                        <Eye size={17} />
                      ) : (
                        <EyeOff size={17} />
                      )}
                    </button>
                  ) : (
                    iconAppend
                  )
                }
                iconPrepend={iconPrepend}
                required={isRequired}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
                height="auto"
                type={displayPassword ? "text" : props.type}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

InputControl.displayName = "InputControl";
