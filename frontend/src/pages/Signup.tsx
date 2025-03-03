import { useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/Input";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
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
        <Heading label="Sign Up" />
      </div>
      <div>
        <SubHeading label="Enter your information to create an account" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First name"
          placeholder="John"
          type="text"
          {...register("firstName", {
            required: "First name is required",
          })}
        />
        {errors.firstName?.message && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
        <Input
          label="Last name"
          placeholder="Cena"
          type="text"
          {...register("lastName", {
            required: "Last name is required",
          })}
        />
        {errors.lastName?.message && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
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
          label="Email"
          placeholder="johncena@gmail.com"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email.message}</p>
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
          value={isSubmitting ? "Signing up" : "Sign up"}
        />
        <BottomWarning message="Already have an account? " navigateTo="Sign in" path="/signin"/>
      </form>
    </div>
    </div>
  );
}
