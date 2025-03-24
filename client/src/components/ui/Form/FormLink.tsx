import cn from "@/utils/cn";
import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

const FormLink = forwardRef<HTMLLinkElement, LinkProps>(({ className, ...rest }) => {
  return <Link {...rest} className={cn("text-sm text-gray-500 hover:text-gray-950 hover:underline", className)}></Link>;
});

export default FormLink;
