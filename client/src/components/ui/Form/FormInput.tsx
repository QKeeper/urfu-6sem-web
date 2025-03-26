import cn from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

const FormInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        "rounded px-4 py-2 text-sm tracking-wide outline outline-gray-500 focus:bg-gray-50 focus:outline-gray-950",
        className,
      )}
    />
  );
});

export default FormInput;
