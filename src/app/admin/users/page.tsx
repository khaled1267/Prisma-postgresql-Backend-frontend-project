"use client";

import { useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useUsers, useUpdateUserMutation } from "@/hooks/useUsers";
import { UserRole } from "@/types/user";

export default function AdminUsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();
  const updateUser = useUpdateUserMutation();
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleRoleChange = (id: string, role: UserRole) => {
    setUpdateError(null);
    updateUser.mutate(
      { id, data: { role } },
      {
        onError: (mutationError) => {
          setUpdateError(
            mutationError.response?.data?.message ??
              mutationError.message ??
              "Unable to update the user's role."
          );
        },
      }
    );
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex min-h-screen flex-col bg-base-100 lg:flex-row">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
          <AdminHeader
            title="Manage User Roles"
            description="Assign CUSTOMER or ADMIN access to existing accounts."
          />

          <section className="mt-6 space-y-4 rounded-3xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Registered Accounts</h2>
              <p className="text-xs text-base-content/60">
                New registrations remain CUSTOMER accounts by default.
              </p>
            </div>

            {updateError && (
              <ErrorComponent title="Role update failed" message={updateError} />
            )}
            {isError && (
              <ErrorComponent
                title="Failed to load users"
                message={error?.message}
              />
            )}
            {isLoading ? (
              <LoadingComponent message="Loading user accounts..." />
            ) : !isError ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase text-base-content/60">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id}>
                        <td className="font-semibold">{user.name}</td>
                        <td className="text-base-content/70">{user.email}</td>
                        <td>
                          <select
                            className="select select-bordered select-xs bg-base-100"
                            value={user.role}
                            disabled={updateUser.isPending}
                            onChange={(event) => {
                              const role =
                                event.target.value === "ADMIN"
                                  ? "ADMIN"
                                  : "CUSTOMER";
                              handleRoleChange(user.id, role);
                            }}
                            aria-label={`Role for ${user.name}`}
                          >
                            <option value="CUSTOMER">CUSTOMER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {!users?.length && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-6 text-center text-base-content/50"
                        >
                          No user accounts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </RoleGuard>
  );
}
