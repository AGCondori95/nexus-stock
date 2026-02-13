import {useState} from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProducts";
import {ProductCard} from "../components/products/ProductCard";
import {ProductForm} from "../components/products/ProductForm";
import {Button} from "../components/ui/button";
import {Input} from "../components/ui/input";
import {Plus, Search} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import {Download} from "lucide-react";
import {downloadProductsCSV, downloadInventoryReport} from "../api/exportApi";

export const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const {data, isLoading} = useProducts(filters);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const products = data?.data?.products || [];

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      await downloadProductsCSV(filters);
    } catch (error) {
      alert("Failed to export products");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      await downloadInventoryReport();
    } catch (error) {
      alert("Failed to export inventory report");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sku", data.sku);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("lowStockThreshold", data.lowStockThreshold);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({id: editingProduct._id, formData});
      } else {
        await createMutation.mutateAsync(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({...filters, search: searchTerm});
  };

  if (showForm) {
    return (
      <div>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          {editingProduct ? "Edit Product" : "Create Product"}
        </h1>
        <Card>
          <CardContent className='pt-6'>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              isLoading={createMutation.isLoading || updateMutation.isLoading}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
          <p className='text-muted-foreground mt-1'>Manage your inventory</p>
        </div>
        <div className='flex space-x-2'>
          <Button
            variant='outline'
            onClick={handleExportCSV}
            disabled={isExporting}>
            <Download className='h-4 w-4 mr-2' />
            Export CSV
          </Button>
          <Button
            variant='outline'
            onClick={handleExportReport}
            disabled={isExporting}>
            <Download className='h-4 w-4 mr-2' />
            Full Report
          </Button>
          <Button onClick={handleCreate}>
            <Plus className='h-4 w-4 mr-2' />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className='pt-6'>
          <form onSubmit={handleSearch} className='flex space-x-2'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search by name or SKU...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-9'
              />
            </div>
            <Button type='submit'>Search</Button>
            {filters.search && (
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setSearchTerm("");
                  setFilters({});
                }}>
                Clear
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {isLoading ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>
              No products found. Create your first product!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
