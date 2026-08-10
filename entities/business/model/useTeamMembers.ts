import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetStaffMembers } from "./useStaffMembers";
import { getStaffMembersAction } from "../api/staff.actions";

export function useAllTeamMembers(params?: { search: string }) {
  const { data: staffMembers } = useGetStaffMembers(params);

  const dataPayload = staffMembers?.data as any;
  const staffArray = Array.isArray(dataPayload) 
    ? dataPayload 
    : (dataPayload?.staff || dataPayload?.deviceFinanceUsers || []);
  const allTeamMembers = staffArray.map((member: any) => ({
    id: member.id,
    email: member?.user?.email || "",
    location: member?.location || "",
  }));

  return { allTeamMembers };
}

export function useOtherTeamMembers(params?: { search: string }) {
  const { data: staffMembersData, isLoading } = useGetStaffMembers(params);
  const { user } = useAuth();
  const dataPayload = staffMembersData?.data as any;
  const staffMembers = Array.isArray(dataPayload) 
    ? dataPayload 
    : (dataPayload?.staff || dataPayload?.deviceFinanceUsers || []);

  const otherTeamMembers = staffMembers?.filter((member: any) => member?.user?.email !== user?.email);

  return { otherTeamMembers, isLoading };
}

export function useStaffMembersInfinite({
  limit = 10,
  ...params
}: {
  search?: string;
  limit?: number;
} = {}) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["staff-members", "infinite", params, limit],
    queryFn: async ({ pageParam }) => {
      const result = await getStaffMembersAction({ ...params, page: pageParam, limit });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage?.data ?? {};
      return page && totalPages && page < totalPages ? page + 1 : undefined;
    },
  });

  const staffMembers = data?.pages.flatMap((page) => {
    const payload = page?.data as any;
    return Array.isArray(payload) ? payload : (payload?.staff || payload?.deviceFinanceUsers || []);
  }) ?? [];

  return {
    staffMembers,
    isLoading,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  };
}

export function useOtherStaffMembersExceptStaff({
  excludeUserId,
  limit = 10,
  ...params
}: {
  excludeUserId: string;
  search?: string;
  limit?: number;
}) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["staff-members", "infinite", "except-staff", params, limit],
    queryFn: async ({ pageParam }) => {
      const result = await getStaffMembersAction({ ...params, page: pageParam, limit });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage?.data ?? {};
      return page && totalPages && page < totalPages ? page + 1 : undefined;
    },
  });

  const staffMembers = data?.pages.flatMap((page) => {
    const payload = page?.data as any;
    return Array.isArray(payload) ? payload : (payload?.staff || payload?.deviceFinanceUsers || []);
  }) ?? [];
  const otherTeamMembers = staffMembers.filter((member: any) => member?.user?.id !== excludeUserId);

  return {
    otherTeamMembers,
    isLoading,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  };
}
