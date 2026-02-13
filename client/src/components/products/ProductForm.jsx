import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema} from "../../schemas/productSchema";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {CATEGORIES} from "../../utils/constants";
import {X} from "lucide-react";

export const ProductForm = ({initialData, onSubmit, onCancel, isLoading}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      sku: "",
      category: "",
      price: 0,
      quantity: 0,
      lowStockThreshold: 10,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Product Name */}
        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>
            Product Name *
          </label>
          <Input
            id='name'
            placeholder='Laptop Dell XPS 15'
            {...register("name")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className='text-sm text-destructive'>{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}
        <div className='space-y-2'>
          <label htmlFor='sku' className='text-sm font-medium'>
            SKU *
          </label>
          <Input
            id='sku'
            placeholder='LAPTOP-XPS15'
            {...register("sku")}
            disabled={isLoading}
          />
          {errors.sku && (
            <p className='text-sm text-destructive'>{errors.sku.message}</p>
          )}
        </div>

        {/* Category */}
        <div className='space-y-2'>
          <label htmlFor='category' className='text-sm font-medium'>
            Category *
          </label>
          <select
            id='category'
            {...register("category")}
            disabled={isLoading}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'>
            <option value=''>Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-sm text-destructive'>
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div className='space-y-2'>
          <label htmlFor='price' className='text-sm font-medium'>
            Price ($) *
          </label>
          <Input
            id='price'
            type='number'
            step='0.01'
            placeholder='1299.99'
            {...register("price", {valueAsNumber: true})}
            disabled={isLoading}
          />
          {errors.price && (
            <p className='text-sm text-destructive'>{errors.price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div className='space-y-2'>
          <label htmlFor='quantity' className='text-sm font-medium'>
            Quantity *
          </label>
          <Input
            id='quantity'
            type='number'
            placeholder='50'
            {...register("quantity", {valueAsNumber: true})}
            disabled={isLoading}
          />
          {errors.quantity && (
            <p className='text-sm text-destructive'>
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Low Stock Threshold */}
        <div className='space-y-2'>
          <label htmlFor='lowStockThreshold' className='text-sm font-medium'>
            Low Stock Threshold *
          </label>
          <Input
            id='lowStockThreshold'
            type='number'
            placeholder='10'
            {...register("lowStockThreshold", {valueAsNumber: true})}
            disabled={isLoading}
          />
          {errors.lowStockThreshold && (
            <p className='text-sm text-destructive'>
              {errors.lowStockThreshold.message}
            </p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div className='space-y-2'>
        <label htmlFor='image' className='text-sm font-medium'>
          Product Image
        </label>
        <Input
          id='image'
          type='file'
          accept='image/*'
          {...register("image")}
          disabled={isLoading}
        />
        {errors.image && (
          <p className='text-sm text-destructive'>{errors.image.message}</p>
        )}
        <p className='text-xs text-muted-foreground'>
          Max file size: 5MB. Supported formats: JPG, PNG, WebP
        </p>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-end space-x-2 pt-4'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}>
          <X className='h-4 w-4 mr-2' />
          Cancel
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : initialData
              ? "Update Product"
              : "Create Product"}
        </Button>
      </div>
    </form>
  );
};
