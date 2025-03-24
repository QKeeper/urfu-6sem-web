import cn from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(({ className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        "rounded border border-gray-500 px-4 py-2 text-sm tracking-wide focus:border-gray-950 focus:bg-gray-50 focus:outline-none",
        className,
      )}
    />
  );
});

export default Input;
