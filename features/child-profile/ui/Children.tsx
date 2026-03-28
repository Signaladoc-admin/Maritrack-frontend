"use client";

import { useParentChildren } from "@/entities/children/model/useChildren";
import ChildCard from "./ChildCard";
import { Child } from "../model/types";
import Link from "next/link";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import NewChildProfileButton from "./NewChildProfileButton";
import { useState } from "react";
import { AddEditChildModal } from "./ChildDetailsModal";

export default function Children() {
  const { children, isFetchingChildren } = useParentChildren();

  const [isShowingCreateChildModal, setIsShowingCreateChildModal] = useState(false);

  return (
    <>
      <div>
        {isFetchingChildren && (
          <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardWrapper key={index} variant="default" className="px-4 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200"></div>
                <div className="h-6 w-24 rounded bg-gray-200 text-lg font-medium"></div>
              </CardWrapper>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {children?.map((child: Child) => (
            <Link href={`/child/${child.id}`} key={child.id}>
              <ChildCard child={child} />
            </Link>
          ))}
        </div>

        <div className="mt-4 max-w-lg">
          <NewChildProfileButton
            onClick={() => setIsShowingCreateChildModal(true)}
            text="New Child Profile"
            variant="vertical"
          />
        </div>
      </div>

      <AddEditChildModal
        open={isShowingCreateChildModal}
        initialData={{
          age: 11,
          gender: "MALE",
          name: "Obafemi Jnr.",
          profileImage: undefined,
        }}
        onOpenChange={setIsShowingCreateChildModal}
      />
    </>
  );
}
