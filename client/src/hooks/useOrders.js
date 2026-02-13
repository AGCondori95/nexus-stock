import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from "../api/orderApi";
import {QUERY_KEYS} from "../utils/constants";

/**
 * Hook to fetch orders
 * @param {Object} params - Query parameters
 * @returns {Object} Query result
 */
export const useOrders = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, params],
    queryFn: () => getOrders(params),
    staleTime: 30000,
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch single order
 * @param {string} id - Order ID
 * @returns {Object} Query result
 */
export const useOrder = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
    staleTime: 60000,
  });
};

/**
 * Hook to create order
 * @returns {Object} Mutation result
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Invalidate orders and products (stock changed)
      queryClient.invalidateQueries([QUERY_KEYS.ORDERS]);
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCTS]);
    },
  });
};

/**
 * Hook to update order status
 * @returns {Object} Mutation result
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, status}) => updateOrderStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QUERY_KEYS.ORDER, variables.id]);
      queryClient.invalidateQueries([QUERY_KEYS.ORDERS]);
    },
  });
};
