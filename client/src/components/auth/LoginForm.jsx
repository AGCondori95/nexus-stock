import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../../schemas/authSchema";
import {Input} from "../ui/input";
import {Button} from "../ui/button";

export const LoginForm = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: zodResolver(loginSchema)});

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {error && (
        <div className='bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm'>
          {error}
        </div>
      )}

      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium'>
          Email
        </label>
        <Input
          id='email'
          type='email'
          placeholder='john@example.com'
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && (
          <p className='text-sm text-destructive'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label htmlFor='password' className='text-sm font-medium'>
          Password
        </label>
        <Input
          id='password'
          type='password'
          placeholder='••••••••'
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && (
          <p className='text-sm text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
