import cn from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

interface FormLabel extends ComponentProps<"label"> {
  name?: string;
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabel>(({ children, className, name, ...rest }, ref) => {
  return (
    <label ref={ref} className={cn("flex flex-col", className)} {...rest}>
      {name}
      {children}
    </label>
  );
});

export default FormLabel;
