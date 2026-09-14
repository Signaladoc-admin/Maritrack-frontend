"use client";

import { useParentChildren } from "@/entities/children/model/useChildren";
import ChildCard from "./ChildCard";
import { Child } from "../model/types";
import Link from "next/link";
import NewChildProfileButton from "./NewChildProfileButton";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/shared/ui/skeleton";

export default function Children() {
  const { data: childrenRes, isLoading: isFetchingChildren } = useParentChildren();
  const children: Child[] = childrenRes?.data ?? [];
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Loading Skeletons */}
      {isFetchingChildren && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="surface flex h-[210px] flex-col justify-between rounded-[var(--radius-lg)] p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-13 w-13 rounded-2xl" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Children Grid */}
      {!isFetchingChildren && (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child: Child) => (
            <Link href={`/child/${child.id}`} key={child.id} className="h-full">
              <ChildCard child={child} />
            </Link>
          ))}

          {/* Add Child Profile Button as part of the grid */}
          <div className="h-full">
            <NewChildProfileButton
              onClick={() => router.push("/children/add")}
              text="Add a child profile"
              variant="vertical"
              className="h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
