import { ComponentProps } from "react";
import FormError from "./FormError";
import FormInput from "./FormInput";
import cn from "@/utils/cn";
import FormSubmit from "./FormSubmit";
import FormLink from "./FormLink";
import FormLabel from "./FormLabel";

function Form({ className, ...rest }: ComponentProps<"form">) {
  return <form className={cn("flex flex-col gap-2", className)} {...rest} />;
}

Form.Input = FormInput;
Form.Label = FormLabel;
Form.Submit = FormSubmit;
Form.Link = FormLink;
Form.Error = FormError;

export default Form;
