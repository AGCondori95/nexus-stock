import {useNavigate} from "react-router-dom";
import {useCreateOrder} from "../hooks/useOrders";
import {OrderForm} from "../components/orders/OrderForm";
import {Button} from "../components/ui/button";
import {ArrowLeft} from "lucide-react";

export const CreateOrder = () => {
  const navigate = useNavigate();
  const createMutation = useCreateOrder();

  const handleSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data);
      navigate("/orders", {
        state: {message: "Order created successfully!"},
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-4'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => navigate("/orders")}>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Create New Order</h1>
          <p className='text-muted-foreground mt-1'>
            Add products and customer details
          </p>
        </div>
      </div>

      <OrderForm onSubmit={handleSubmit} isLoading={createMutation.isLoading} />
    </div>
  );
};
