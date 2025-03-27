import { API } from "@/api";
import { ILoginResponse, IRegisterFields } from "@/api.models";
import Form from "@/components/ui/Form/Form";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IRegisterFields>();

  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<IRegisterFields> = (data) => {
    setIsPending(true);
    API.Auth.register(data)
      .then(() => navigate("/"))
      .catch((err) => {
        if (isAxiosError(err)) {
          const axiosErr = err as AxiosError<ILoginResponse>;
          if (axiosErr.response) {
            setError("root", { message: axiosErr.response.data.message });
          }
        } else {
          setError("root", { message: "Unknown error" });
        }
      })
      .finally(() => setIsPending(false));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form onSubmit={handleSubmit(onSubmit)} className="max-w-64">
        <Form.Input
          autoFocus
          placeholder="Username"
          {...register("username", { required: true, minLength: 3, maxLength: 32 })}
        />
        {errors.username?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.username?.type == "minLength" && <Form.Error>Minimum 3 characters long</Form.Error>}
        {errors.username?.type == "maxLength" && <Form.Error>Maximum 32 characters long</Form.Error>}

        <Form.Input
          placeholder="Display Name"
          {...register("displayName", { required: true, minLength: 1, maxLength: 64 })}
        />
        {errors.displayName?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.displayName?.type == "minLength" && <Form.Error>Minimum 1 characters long</Form.Error>}
        {errors.displayName?.type == "maxLength" && <Form.Error>Maximum 64 characters long</Form.Error>}

        <Form.Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6, maxLength: 64 })}
        />
        {errors.password?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.password?.type == "minLength" && <Form.Error>Minimum 6 characters long</Form.Error>}
        {errors.password?.type == "maxLength" && <Form.Error>Maximum 64 characters long</Form.Error>}

        <Form.Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            minLength: 6,
            maxLength: 64,
            validate: (val) => {
              if (val !== watch("password")) return "Passwords does not match";
            },
          })}
        />
        {errors.confirmPassword?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.confirmPassword?.type == "minLength" && <Form.Error>Minimum 6 characters long</Form.Error>}
        {errors.confirmPassword?.type == "maxLength" && <Form.Error>Maximum 64 characters long</Form.Error>}
        {errors.confirmPassword?.type == "validate" && <Form.Error>{errors.confirmPassword.message}</Form.Error>}

        {errors.root && <Form.Error>{errors.root.message}</Form.Error>}

        <Form.Submit isPending={isPending} disabled={isPending}>
          Register
        </Form.Submit>

        <Form.Link to="/login">Already have an acoount?</Form.Link>
      </Form>
    </div>
  );
}

export default RegisterPage;
