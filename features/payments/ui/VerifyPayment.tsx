import { useEffect, useRef } from 'react'
import { useVerifyPayment } from '../model/usePayments';

export default function VerifyPayment({ reference }: { reference: string }) {
    const { mutateAsync: verifyPayment } = useVerifyPayment();
    // Ref guard prevents the verification firing more than once per reference,
    // even under React 18 StrictMode which intentionally double-invokes effects
    // in development (mount → unmount → remount).
    const verifiedRef = useRef<string | null>(null);

    useEffect(() => {
        if (reference && verifiedRef.current !== reference) {
            verifiedRef.current = reference;
            verifyPayment(reference);
        }
    }, [reference]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex h-[400px] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73]" />
            <p className="text-sm font-medium text-slate-500">Verifying payment...</p>
        </div>
    );
}
