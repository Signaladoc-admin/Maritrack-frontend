"use client";

import { UserManagementWidget } from "@/widgets/user-management";

const Users = () => {
  return (
    <div className="h-full rounded-3xl bg-white p-4 md:p-8">
      <UserManagementWidget />
    </div>
  );
};

export default Users;
