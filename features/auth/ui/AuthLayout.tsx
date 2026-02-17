import React from "react";
import Image from "next/image";

export default function AuthLayout({
  contentPosition = "left",
  children,
}: {
  contentPosition?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex min-h-screen w-full p-5">
      {/* Form Section */}
      <div
        className={
          contentPosition === "left"
            ? "flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-3/5 lg:flex-none lg:px-20 xl:px-24"
            : "flex-row-reverse"
        }
      >
        <div className="mx-auto w-full max-w-sm lg:w-2/3">{children}</div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:relative lg:block lg:flex-1">
        <img
          className="absolute inset-0 h-full w-full rounded-4xl object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Authentication background"
          // fill
          // priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
