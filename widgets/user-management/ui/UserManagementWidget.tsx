"use client";

import React, { useState, useMemo } from "react";
import { UserList, ListItem } from "./UserList";
import { UserDetails } from "./UserDetails";
import { DepartmentDetails } from "./DepartmentDetails";
import { AddEditUserModal } from "@/features/user-management/ui/AddEditUserModal";
import { DeleteUserModal } from "@/features/user-management/ui/DeleteUserModal";
import { EditDepartmentModal } from "@/features/department-management/ui/EditDepartmentModal";
import { DeleteDepartmentModal } from "@/features/department-management/ui/DeleteDepartmentModal";
import { MOCK_USERS, UserInfo, UserFormValues } from "@/entities/user";
import { MOCK_DEPARTMENTS, DepartmentInfo } from "@/entities/department";

export const UserManagementWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<UserInfo[]>(MOCK_USERS);
  const [departments, setDepartments] = useState<DepartmentInfo[]>(MOCK_DEPARTMENTS);
  
  const [selectedUserId, setSelectedUserId] = useState<string>(MOCK_USERS[0]?.id || "");
  const [selectedDeptId, setSelectedDeptId] = useState<string>(MOCK_DEPARTMENTS[0]?.id || "");
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  
  const [isEditDeptModalOpen, setIsEditDeptModalOpen] = useState(false);
  const [isDeleteDeptModalOpen, setIsDeleteDeptModalOpen] = useState(false);

  // Common mapping to ListItem format for the sidebar
  const items: ListItem[] = useMemo(() => {
    if (activeTab === "users") {
      return users.filter(u => {
        const name = `${u.firstName} ${u.lastName}`.toLowerCase();
        return name.includes(searchQuery.toLowerCase()) || u.id.toLowerCase().includes(searchQuery.toLowerCase());
      }).map(u => ({
        id: u.id,
        title: `${u.firstName} ${u.lastName}`,
        subtitle: u.id,
      }));
    }
    if (activeTab === "departments") {
      return departments.filter(d => {
        return d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase());
      }).map(d => ({
        id: d.id,
        title: d.name,
        subtitle: d.id,
      }));
    }
    return [];
  }, [activeTab, users, departments, searchQuery]);

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedUserId) || null,
    [users, selectedUserId]
  );
  
  const selectedDept = useMemo(
    () => departments.find((d) => d.id === selectedDeptId) || null,
    [departments, selectedDeptId]
  );

  // Users Handlers
  const handleCreateUser = (data: UserFormValues) => {
    const newUser: UserInfo = {
      ...data,
      id: `#${Math.floor(Math.random() * 900000) + 100000}`,
      location: data.state,
      city: data.state,
      postalCode: "101012",
      zone: "Global_Zone",
    };
    setUsers((prev) => [newUser, ...prev]);
    setSelectedUserId(newUser.id);
  };

  const handleEditUser = (data: UserFormValues) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUserId ? { ...u, ...data } : u))
    );
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
    setIsDeleteUserModalOpen(false);
    setSelectedUserId(users.find(u => u.id !== selectedUserId)?.id || "");
  };

  // Departments Handlers
  const handleEditDept = (newName: string) => {
    setDepartments(prev => 
      prev.map(d => d.id === selectedDeptId ? { ...d, name: newName } : d)
    );
  };

  const handleDeleteDept = () => {
    setDepartments(prev => prev.filter(d => d.id !== selectedDeptId));
    setIsDeleteDeptModalOpen(false);
    setSelectedDeptId(departments.find(d => d.id !== selectedDeptId)?.id || "");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full min-h-[600px]">
      <UserList
        items={items}
        selectedId={activeTab === "users" ? selectedUserId : selectedDeptId}
        onSelect={activeTab === "users" ? setSelectedUserId : setSelectedDeptId}
        onAdd={activeTab === "users" ? () => setIsAddUserModalOpen(true) : () => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
        }}
      />
      
      <div className="flex-1 overflow-hidden">
        {activeTab === "users" && (
          <UserDetails
            user={selectedUser}
            onEditUser={() => setIsEditUserModalOpen(true)}
            onDeleteUser={() => setIsDeleteUserModalOpen(true)}
          />
        )}
        {activeTab === "departments" && (
          <DepartmentDetails
            department={selectedDept}
            onEdit={() => setIsEditDeptModalOpen(true)}
            onDelete={() => setIsDeleteDeptModalOpen(true)}
          />
        )}
        {activeTab === "locations" && (
           <div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-50 text-gray-400">
             Locations view coming soon
           </div>
        )}
      </div>

      {/* Modals */}
      <AddEditUserModal
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        onSave={handleCreateUser}
      />
      <AddEditUserModal
        open={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        initialData={selectedUser || undefined}
        onSave={handleEditUser}
      />
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        onOpenChange={setIsDeleteUserModalOpen}
        user={selectedUser}
        onConfirm={handleDeleteUser}
      />
      
      <EditDepartmentModal
        open={isEditDeptModalOpen}
        onOpenChange={setIsEditDeptModalOpen}
        department={selectedDept}
        onSave={handleEditDept}
      />
      <DeleteDepartmentModal
        open={isDeleteDeptModalOpen}
        onOpenChange={setIsDeleteDeptModalOpen}
        department={selectedDept}
        onConfirm={handleDeleteDept}
      />
    </div>
  );
};
