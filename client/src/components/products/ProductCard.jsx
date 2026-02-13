import {Card, CardContent, CardFooter} from "../ui/card";
import {Button} from "../ui/button";
import {formatCurrency} from "../../utils/formatters";
import {Edit, Trash2, AlertCircle, Package} from "lucide-react";

export const ProductCard = ({product, onEdit, onDelete}) => {
  const isLowStock = product.quantity <= product.lowStockThreshold;

  return (
    <Card className='overflow-hidden'>
      <div className='aspect-square bg-gray-100 relative'>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400'>
            <Package className='h-16 w-16' />
          </div>
        )}
        {isLowStock && (
          <div className='absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1'>
            <AlertCircle className='h-3 w-3' />
            <span>Low Stock</span>
          </div>
        )}
      </div>

      <CardContent className='p-4'>
        <div className='space-y-2'>
          <h3 className='font-semibold text-lg line-clamp-1'>{product.name}</h3>
          <p className='text-sm text-muted-foreground'>SKU: {product.sku}</p>
          <div className='flex items-center justify-between'>
            <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded'>
              {product.category}
            </span>
            <span className='text-sm text-muted-foreground'>
              Stock:{" "}
              <span
                className={
                  isLowStock ? "text-orange-600 font-semibold" : "font-semibold"
                }>
                {product.quantity}
              </span>
            </span>
          </div>
          <p className='text-2xl font-bold text-primary'>
            {formatCurrency(product.price)}
          </p>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0 flex space-x-2'>
        <Button
          variant='outline'
          size='sm'
          className='flex-1'
          onClick={() => onEdit(product)}>
          <Edit className='h-4 w-4 mr-2' />
          Edit
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => onDelete(product._id)}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  );
};
