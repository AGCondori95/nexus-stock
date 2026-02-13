import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../api/productApi";
import {QUERY_KEYS} from "../utils/constants";

/**
 * Hook to fetch products with filters
 * @param {Object} filters - Query filters
 * @returns {Object} Query result
 */
export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, filters],
    queryFn: () => getProducts(filters),
    staleTime: 30000, // 30 seconds
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch single product
 * @param {string} id - Product ID
 * @returns {Object} Query result
 */
export const useProduct = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute
  });
};

/**
 * Hook to fetch categories
 * @returns {Object} Query result
 */
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    staleTime: Infinity, // Categories rarely change
  });
};

/**
 * Hook to create product
 * @returns {Object} Mutation result
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate products query to refetch
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCTS]);
    },
  });
};

/**
 * Hook to update product
 * @returns {Object} Mutation result
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, formData}) => updateProduct(id, formData),
    onSuccess: (data, variables) => {
      // Invalidate specific product and products list
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCT, variables.id]);
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCTS]);
    },
  });
};

/**
 * Hook to delete product
 * @returns {Object} Mutation result
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCTS]);
    },
  });
};
