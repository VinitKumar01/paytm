import { useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/Input";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

interface SignupFormData {
  username: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ mode: "onBlur" });

  function onSubmit(data: SignupFormData) {
    console.log("Form submitted with data:", data);
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#7E7E7E]">
    <div className="flex flex-col justify-center rounded-md items-center max-w-xs bg-white">
      <div>
        <Heading label="Sign In" />
      </div>
      <div>
        <SubHeading label="Enter your credentials to access your account" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          placeholder="johncena_01"
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username?.message && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <Input
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password?.message && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Signing in" : "Sign in"}
        />
        <BottomWarning message="Don't have an account? " navigateTo="Sign up" path="/signup"/>
      </form>
    </div>
    </div>
  );
}
