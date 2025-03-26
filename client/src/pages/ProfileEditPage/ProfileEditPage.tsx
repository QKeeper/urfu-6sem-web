import { useAppSelector } from "@/app/hooks";
import Form from "@/components/ui/Form/Form";
import { selectUser, selectUserIsPending } from "@/features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

interface FormFields {
  username: string;
  displayName: string;
}

function ProfileEditPage() {
  const user = useAppSelector(selectUser);
  const isPending = useAppSelector(selectUserIsPending);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  if (isPending) return null;
  if (!user) return <Navigate to="/login" />;

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-medium">Edit Profile</h1>
      <Form className="max-w-96" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label name="Username">
          <Form.Input
            defaultValue={user.username}
            placeholder={user.username}
            {...register("username", { required: true, minLength: 3, maxLength: 32 })}
          />
        </Form.Label>
        {errors.username?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.username?.type == "minLength" && <Form.Error>Minimum 3 characters long</Form.Error>}
        {errors.username?.type == "maxLength" && <Form.Error>Maximum 32 characters long</Form.Error>}
        <Form.Label name="Display Name">
          <Form.Input
            defaultValue={user.displayName}
            placeholder={user.displayName}
            {...register("displayName", { required: true, maxLength: 64 })}
          />
        </Form.Label>
        {errors.displayName?.type == "required" && <Form.Error>Field is required</Form.Error>}
        {errors.displayName?.type == "maxLength" && <Form.Error>Maximum 64 characters long</Form.Error>}
        <Form.Submit className="w-fit">Save Changes</Form.Submit>
      </Form>
    </div>
  );
}

export default ProfileEditPage;
