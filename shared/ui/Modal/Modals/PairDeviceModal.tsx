"use client";

import { Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog"; // Adjust path as needed
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";
import { useParams } from "next/navigation";
import { QRCodeCard } from "../../cards/qr-code-card";
import Modal from "../../modal";

export function PairDeviceModal({
  open,
  onOpenChange,
  childId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childId?: string;
}) {
  const params = useParams<{ child: string }>();
  const child = childId || params?.child;

  const { qrCodeSrc, isLoading: isGenerating, isError } = useQrCode(child as string);

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      className="h-auto rounded-4xl p-10 md:max-w-[1100px] lg:p-20"
    >
      <div className="grid place-items-center gap-8 md:grid-cols-2 md:place-items-stretch md:gap-12">
        {/* Left Column: Instructions */}
        <div className="flex flex-col justify-between rounded-3xl bg-neutral-100 p-8 py-14! md:p-10">
          <div className="">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-left text-xl font-bold text-[#1B3C73]">
                Pair new device
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Scan the QR code on your child's device to connect it.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Open the app on the child's phone</li>
                <li>Tap Pair device</li>
                <li>Scan the QR code to finish setup</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 rounded text-xs font-medium text-slate-400">
            <span className="text-center">
              <Lock className="mr-1 inline h-3 w-3" strokeWidth={2.5} />
              Pairing is secure and only works with your approval.
            </span>
          </div>
        </div>

        {/* Right Column: QR Code Visual */}
        <QRCodeCard
          src={qrCodeSrc!}
          isLoading={isGenerating}
          isError={isError}
          className="w-fit p-6 sm:p-8"
        />
      </div>
    </Modal>
  );

  // return (
  //   <Dialog open={open} onOpenChange={onOpenChange}>
  //     <DialogContent className="h-auto rounded-4xl p-10 sm:max-w-[1100px] md:p-20">
  //       <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-2">
  //         {/* Left Column: Instructions */}
  //         <div className="flex flex-col justify-between rounded-3xl bg-neutral-100 p-8 md:p-10">
  //           <div className="">
  //             <DialogHeader className="mb-6">
  //               <DialogTitle className="text-left text-lg font-bold text-[#1B3C73]">
  //                 Pair new device
  //               </DialogTitle>
  //             </DialogHeader>
  //             <div className="space-y-4 text-sm text-slate-600">
  //               <p>Scan the QR code on your child's device to connect it.</p>
  //               <ul className="list-disc space-y-2 pl-5">
  //                 <li>Open the app on the child's phone</li>
  //                 <li>Tap Pair device</li>
  //                 <li>Scan the QR code to finish setup</li>
  //               </ul>
  //             </div>
  //           </div>

  //           <div className="mt-8 flex items-center gap-2 rounded text-xs text-slate-400">
  //             <Lock className="h-3 w-3" />
  //             <span className="text-center">
  //               Pairing is secure and only works with your approval.
  //             </span>
  //           </div>
  //         </div>

  //         {/* Right Column: QR Code Visual */}
  //         <QRCodeCard
  //           src={qrCodeSrc!}
  //           isLoading={isGenerating}
  //           isError={isError}
  //           className="w-fit p-4 sm:p-8"
  //         />
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // );
}
