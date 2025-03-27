import cn from "@/utils/cn";
import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

const FormLink = forwardRef<HTMLAnchorElement, LinkProps>(({ className, ...rest }, ref) => {
  return (
    <Link
      ref={ref}
      {...rest}
      className={cn("text-sm text-gray-500 hover:text-gray-950 hover:underline", className)}
    ></Link>
  );
});

export default FormLink;
