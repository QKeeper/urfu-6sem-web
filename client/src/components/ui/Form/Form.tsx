import { ComponentProps } from "react";
import Error from "./Error";
import Input from "./Input";
import cn from "@/utils/cn";
import Submit from "./Submit";

function Form({ className, ...rest }: ComponentProps<"form">) {
  return <form className={cn("flex flex-col gap-2", className)} {...rest} />;
}

Form.Error = Error;
Form.Input = Input;
Form.Submit = Submit;

export default Form;
