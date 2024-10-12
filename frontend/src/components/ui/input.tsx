import * as React from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    iconPrepend?: React.ReactNode;
    iconAppend?: React.ReactNode;
    onClear?: () => void;
    clearable?: boolean;
  }
>(
  (
    {
      className,
      iconPrepend,
      iconAppend,
      clearable = false,
      type,
      onClear,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          "w-full group border dark:border-white/15 overflow-hidden rounded-md flex items-center justify-start dark:focus-within:border-primary/50 dark:focus-within:ring-primary/20 dark:focus-within:ring-4 focus-within:border-black/30 transition-all ease-in-out"
        )}
      >
        {/* pe-2.5 */}
        {iconPrepend && (
          <div className="border-e px-3 leading-3 dark:group-focus-within:text-white dark:text-white/70 text-black/70 group-focus-within:text-black transition-all ease-in-out">
            {iconPrepend}
          </div>
        )}
        <input
          type={type}
          className={cn(
            // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "flex h-11 w-full bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-white/30 placeholder:text-black/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {clearable && (
          <button
            className={cn(
              "dark:bg-white/50 mx-3 dark:hover:bg-white bg-black/50 hover:bg-black text-white w-4 h-4 p-0.5 dark:text-black rounded-full flex items-center justify-center transition-all ease-linear opacity-0",
              (ref as any)?.current?.value?.length > 0 && "opacity-100"
            )}
            onClick={onClear}
          >
            <X />
          </button>
        )}
        {iconAppend && (
          <div className="border-s px-3 leading-3 dark:group-focus-within:text-white dark:text-white/70 text-black/70 group-focus-within:text-black transition-all ease-in-out">
            {iconAppend}
          </div>
        )}
      </label>
    );
  }
);
Input.displayName = "Input";

export { Input };
