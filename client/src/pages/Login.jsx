import {Link, Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {LoginForm} from "../components/auth/LoginForm";

export const Login = () => {
  const {isAuthenticated} = useAuth();
  const location = useLocation();
  const message = location.state?.message;

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Welcome to NexusStock
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className='bg-green-50 text-green-700 px-4 py-3 rounded-md text-sm mb-4'>
              {message}
            </div>
          )}
          <LoginForm />
          <div className='mt-4 text-center text-sm'>
            Don't have an account?{" "}
            <Link
              to='/register'
              className='text-primary hover:underline font-medium'>
              Register here
            </Link>
          </div>
        </CardContent>

        <p>User: john@example.com | Pass: password123</p>
      </Card>
    </div>
  );
};
