import {useOrders} from "../hooks/useOrders";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {formatCurrency, formatDateTime} from "../utils/formatters";
import {Button} from "../components/ui/button";
import {Download, Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {downloadOrdersCSV} from "../api/exportApi";
import {useState} from "react";

export const Orders = () => {
  const {data, isLoading} = useOrders();
  const navigate = useNavigate();
  const orders = data?.data?.orders || [];
  const [isExporting, setIsExporting] = useState(false);

  const handleExportOrders = async () => {
    setIsExporting(true);
    try {
      await downloadOrdersCSV();
    } catch (error) {
      alert("Failed to export orders");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex space-x-2'>
        <Button
          variant='outline'
          onClick={handleExportOrders}
          disabled={isExporting}>
          <Download className='h-4 w-4 mr-2' />
          Export CSV
        </Button>
        <Button onClick={() => navigate("/orders/create")}>
          <Plus className='h-4 w-4 mr-2' />
          New Order
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>
              No orders yet. Create your first order!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>{order.orderNumber}</CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}>
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Customer</p>
                    <p className='font-medium'>{order.customerName}</p>
                    <p className='text-sm text-muted-foreground'>
                      {order.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Items</p>
                    <p className='font-medium'>{order.items.length} item(s)</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Total</p>
                    <p className='font-bold text-xl text-primary'>
                      {formatCurrency(order.totalAmount)}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {formatDateTime(order.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
