import { useAuth } from "@/shared/auth/AuthProvider";
import { useBusinessZone, useParentZone } from "@/features/mdm-sync/model/useMdmSync";
import { BusinessZone, ParentZone } from "@/features/mdm-sync/types";

export const useGetZone = ({ enabled = true }: { enabled: boolean }) => {
    const { user } = useAuth();

    const isReady = !!user;
    const isBusiness = user?.appRole === "BUSINESS";

    const {
        data: businessZone,
        isLoading: isLoadingBusinessZone,
        isFetching: isFetchingBusinessZone,
    } = useBusinessZone({ enabled: isReady && isBusiness && enabled });

    const {
        data: parentZone,
        isLoading: isLoadingParentZone,
        isFetching: isFetchingParentZone,
    } = useParentZone({ enabled: isReady && !isBusiness && enabled });

    if (isBusiness) {
        return {
            zone: businessZone as BusinessZone,
            isLoading: isLoadingBusinessZone,
            isFetching: isFetchingBusinessZone,
        };
    } else {
        return {
            zone: parentZone as ParentZone,
            isLoading: isLoadingParentZone,
            isFetching: isFetchingParentZone,
        };
    }
}