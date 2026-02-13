import {useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {orderSchema} from "../../schemas/orderSchema";
import {useProducts} from "../../hooks/useProducts";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Plus, Trash2, ShoppingCart} from "lucide-react";
import {formatCurrency} from "../../utils/formatters";

export const OrderForm = ({onSubmit, isLoading}) => {
  const {data: productsData} = useProducts();
  const products = productsData?.data?.products || [];

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{productId: "", quantity: 1}],
      customerName: "",
      customerEmail: "",
      notes: "",
    },
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  // Calculate total
  const calculateTotal = () => {
    return watchItems.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.productId);
      if (product && item.quantity > 0) {
        return sum + product.price * item.quantity;
      }
      return sum;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Customer Name *</label>
              <Input
                placeholder='John Doe'
                {...register("customerName")}
                disabled={isLoading}
              />
              {errors.customerName && (
                <p className='text-sm text-destructive'>
                  {errors.customerName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Customer Email *</label>
              <Input
                type='email'
                placeholder='john@example.com'
                {...register("customerEmail")}
                disabled={isLoading}
              />
              {errors.customerEmail && (
                <p className='text-sm text-destructive'>
                  {errors.customerEmail.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>
              Order Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              placeholder='Special instructions or notes...'
              disabled={isLoading}
              rows={3}
              className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
            />
            {errors.notes && (
              <p className='text-sm text-destructive'>{errors.notes.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>Order Items</span>
            <Button
              type='button'
              size='sm'
              onClick={() => append({productId: "", quantity: 1})}
              disabled={isLoading}>
              <Plus className='h-4 w-4 mr-2' />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {fields.map((field, index) => {
            const selectedProduct = products.find(
              (p) => p._id === watchItems[index]?.productId,
            );

            return (
              <div
                key={field.id}
                className='flex gap-4 items-start p-4 border rounded-lg'>
                <div className='flex-1 space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Product Selection */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Product *</label>
                      <select
                        {...register(`items.${index}.productId`)}
                        disabled={isLoading}
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'>
                        <option value=''>Select product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name} - {product.sku} (Stock:{" "}
                            {product.quantity})
                          </option>
                        ))}
                      </select>
                      {errors.items?.[index]?.productId && (
                        <p className='text-sm text-destructive'>
                          {errors.items[index].productId.message}
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Quantity *</label>
                      <Input
                        type='number'
                        min='1'
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        disabled={isLoading}
                      />
                      {errors.items?.[index]?.quantity && (
                        <p className='text-sm text-destructive'>
                          {errors.items[index].quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  {selectedProduct && (
                    <div className='bg-muted p-3 rounded-md text-sm space-y-1'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Unit Price:
                        </span>
                        <span className='font-semibold'>
                          {formatCurrency(selectedProduct.price)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Available Stock:
                        </span>
                        <span
                          className={
                            selectedProduct.quantity < 10
                              ? "text-orange-600 font-semibold"
                              : ""
                          }>
                          {selectedProduct.quantity} units
                        </span>
                      </div>
                      {watchItems[index]?.quantity > 0 && (
                        <div className='flex justify-between pt-2 border-t'>
                          <span className='text-muted-foreground'>
                            Subtotal:
                          </span>
                          <span className='font-bold text-primary'>
                            {formatCurrency(
                              selectedProduct.price *
                                watchItems[index].quantity,
                            )}
                          </span>
                        </div>
                      )}
                      {watchItems[index]?.quantity >
                        selectedProduct.quantity && (
                        <p className='text-xs text-destructive pt-1'>
                          ⚠️ Insufficient stock! Only {selectedProduct.quantity}{" "}
                          available.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='destructive'
                    size='icon'
                    onClick={() => remove(index)}
                    disabled={isLoading}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                )}
              </div>
            );
          })}

          {errors.items && typeof errors.items.message === "string" && (
            <p className='text-sm text-destructive'>{errors.items.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Total Items:</span>
              <span className='font-medium'>{fields.length}</span>
            </div>
            <div className='flex justify-between text-lg font-bold border-t pt-2'>
              <span>Total Amount:</span>
              <span className='text-primary'>{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className='flex justify-end space-x-2'>
        <Button type='submit' size='lg' disabled={isLoading || total === 0}>
          <ShoppingCart className='h-4 w-4 mr-2' />
          {isLoading ? "Creating Order..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
};
