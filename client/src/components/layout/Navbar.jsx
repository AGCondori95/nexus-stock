import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {LogOut, User} from "lucide-react";
import {Button} from "../ui/button";

export const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-primary'>NexusStock</h1>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2 text-sm'>
              <User className='h-5 w-5 text-gray-500' />
              <span className='text-gray-700 font-medium'>
                {user?.username}
              </span>
              <span className='text-gray-500'>({user?.email})</span>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={handleLogout}
              className='flex items-center space-x-2'>
              <LogOut className='h-4 w-4' />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
