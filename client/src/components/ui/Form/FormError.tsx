import cn from "@/utils/cn";
import { forwardRef, ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
  className?: string;
}

const FormError = forwardRef<HTMLParagraphElement, ErrorProps>(({ className, children }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm leading-none font-medium text-red-500", className)}>
      {children}
    </p>
  );
});

export default FormError;
