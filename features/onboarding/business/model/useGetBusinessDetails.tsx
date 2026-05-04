import { useGetBusiness } from "@/entities/business/model/useBusiness";
import { useGetBusinessProfile } from "@/entities/business/model/useBusinessProfile";
import { useAuth } from "@/shared/auth/AuthProvider";

export function useGetFullBusinessDetails() {
  const { user } = useAuth();
  const { data: business, isLoading: isLoadingBusiness } = useGetBusiness(user?.businessId!);
  const businessProfileId = business?.profile?.id || "";

  const { data: businessProfile, isLoading: isLoadingBusinessProfile } =
    useGetBusinessProfile(businessProfileId);

  return { business, businessProfile, isLoadingBusiness, isLoadingBusinessProfile };
}
