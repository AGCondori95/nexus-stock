import {AlertTriangle, DollarSign, Package, ShoppingCart} from "lucide-react";
import {StatCard} from "../components/dashboard/StatCard";
import {useDashboardOverview, useDashboardStats} from "../hooks/useDashboard";
import {formatCurrency} from "../utils/formatters";
import {RevenueChart} from "../components/dashboard/RevenueChart";
import {TopProductsChart} from "../components/dashboard/TopProductsChart";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";

export const Dashboard = () => {
  const {data: stats, isLoading: statsLoading} = useDashboardStats();
  const {data: overview, isLoading: overviewLoading} = useDashboardOverview();

  if (statsLoading || overviewLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-lg text-muted-foreground'>
          Loading dashboard...
        </div>
      </div>
    );
  }

  const overviewData = overview?.data;
  const statsData = stats?.data;

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-muted-foreground mt-1'>
          Overview of your inventory and sales
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Revenue'
          value={formatCurrency(statsData?.totalRevenue || 0)}
          icon={DollarSign}
          description='All-time earnings'
        />
        <StatCard
          title='Total Products'
          value={overviewData?.totalProducts || 0}
          icon={Package}
          description='Items in inventory'
        />
        <StatCard
          title='Total Orders'
          value={overviewData?.totalOrders || 0}
          icon={ShoppingCart}
          description='Completed orders'
        />
        <StatCard
          title='Low Stock Items'
          value={overviewData?.lowStockCount || 0}
          icon={AlertTriangle}
          description='Need restock'
        />
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2'>
        <RevenueChart data={statsData?.monthlyRevenue || []} />
        <TopProductsChart data={statsData?.topSellingProducts || []} />
      </div>

      {/* Category Breakdiwn */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {statsData?.categoryBreakdown?.map((category) => (
              <div
                key={category.category}
                className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 rounded-full bg-primary' />
                  <span className='font-medium'>{category.category}</span>
                </div>
                <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                  <span>{category.count} products</span>
                  <span className='font-semibold text-foreground'>
                    {formatCurrency(category.totalValue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Products */}
      {statsData?.lowStockProducts?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <AlertTriangle className='h-5 w-5 text-orange-500' />
              <span>Low Stock Alert</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {statsData.lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className='flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200'>
                  <div>
                    <p className='font-medium text-gray-900'>{product.name}</p>
                    <p className='text-sm text-gray-500'>SKU: {product.sku}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-semibold text-orange-600'>
                      {product.quantity} / {product.lowStockThreshold}
                    </p>
                    <p className='text-xs text-gray-500'>Current / Threshold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
