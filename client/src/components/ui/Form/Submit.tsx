import cn from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

const Submit = forwardRef<HTMLButtonElement, ComponentProps<"button">>(({ className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "h-10 rounded bg-gray-950 text-gray-50 tracking-wide font-medium focus-visible:outline-none",
        className,
      )}
      {...rest}
      type={rest.type || "submit"}
    />
  );
});

export default Submit;
