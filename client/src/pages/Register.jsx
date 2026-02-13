import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {RegisterForm} from "../components/auth/RegisterForm";

export const Register = () => {
  const {isAuthenticated} = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Create an Account
          </CardTitle>
          <CardDescription className='text-center'>
            Get started with NexusStock today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className='mt-4 text-center text-sm'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-primary hover:underline font-medium'>
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
