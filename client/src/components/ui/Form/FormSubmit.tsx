import cn from "@/utils/cn";
import { Loader2Icon } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

interface FormSubmitProps extends ComponentProps<"button"> {
  isPending?: boolean;
}

const FormSubmit = forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ children, className, isPending, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-9 items-center justify-center rounded bg-gray-950 px-3 text-sm font-medium tracking-wide text-gray-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          { "": isPending },
          className,
        )}
        {...rest}
        type={rest.type || "submit"}
        disabled={isPending || disabled}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : children}
      </button>
    );
  },
);

export default FormSubmit;
