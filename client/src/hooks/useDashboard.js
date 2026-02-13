import {useQuery} from "@tanstack/react-query";
import {getDashboardStats, getDashboardOverview} from "../api/dashboardApi";
import {QUERY_KEYS} from "../utils/constants";

/**
 * Hook to fetch dashboard statistics
 * @returns {Object} Query result
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_STATS],
    queryFn: getDashboardStats,
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

/**
 * Hook to fetch dashboard overview
 * @returns {Object} Query result
 */
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_OVERVIEW],
    queryFn: getDashboardOverview,
    staleTime: 30000,
    refetchInterval: 60000, // Refetch every minute
  });
};
