import { ComponentProps } from "react";
import FormError from "./FormError";
import FormInput from "./FormInput";
import cn from "@/utils/cn";
import FormSubmit from "./FormSubmit";
import FormLink from "./FormLink";

function Form({ className, ...rest }: ComponentProps<"form">) {
  return <form className={cn("flex flex-col gap-2", className)} {...rest} />;
}

Form.Error = FormError;
Form.Input = FormInput;
Form.Submit = FormSubmit;
Form.Link = FormLink;

export default Form;
