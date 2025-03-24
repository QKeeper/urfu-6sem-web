import cn from "@/utils/cn";
import { forwardRef, ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
  className?: string;
}

const Error = forwardRef<HTMLParagraphElement, ErrorProps>(({ className, children }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm font-medium text-red-500 leading-none", className)}>
      {children}
    </p>
  );
});

export default Error;
