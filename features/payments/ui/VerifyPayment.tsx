import { useEffect } from 'react'
import { useVerifyPayment } from '../model/usePayments';

export default function VerifyPayment({ reference }: { reference: string }) {
    const { mutateAsync: verifyPayment } = useVerifyPayment();

    useEffect(() => {
        if (reference) {
            verifyPayment(reference);
        }
    }, [reference, verifyPayment]);

    return (
        <div className="flex h-[400px] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]" />
            <p className="text-sm font-medium text-slate-500">Verifying payment...</p>
        </div>
    );
}
