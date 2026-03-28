import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Child } from "../model/types";
import Image from "next/image";
import { User } from "lucide-react";

export default function ChildCard({ child }: { child: Child }) {
  return (
    <CardWrapper variant="default" className="px-4 py-6">
      <div className="mb-1">
        {child?.image ? (
          <Image src={child?.image} alt={child?.name} width={50} height={50} />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <User className="h-6 w-6 text-gray-500" />
          </div>
        )}
      </div>
      <span className="text-lg font-medium">{child?.name}</span>
    </CardWrapper>
  );
}
