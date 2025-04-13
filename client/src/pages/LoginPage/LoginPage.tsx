import { ILoginFields, ILoginResponse } from "@/api.models";
import { useAppDispatch } from "@/app/hooks";
import Form from "@/components/ui/Form/Form";
import { loginUser } from "@/features/auth/authSlice";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginFields>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    setIsPending(true);

    dispatch(loginUser(data))
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
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6, maxLength: 64 })}
        />
        {errors.password?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.password?.type == "minLength" && <Form.Error>Minimum 6 characters long</Form.Error>}
        {errors.password?.type == "maxLength" && <Form.Error>Maximum 64 characters long</Form.Error>}

        {errors.root && <Form.Error>{errors.root.message}</Form.Error>}

        <Form.Submit isPending={isPending} disabled={isPending}>
          Login
        </Form.Submit>

        <Form.Link replace to="/register">
          Don't have an account yet?
        </Form.Link>
      </Form>
    </div>
  );
}

export default LoginPage;
