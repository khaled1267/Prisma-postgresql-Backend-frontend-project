"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";
import LoadingComponent from "@/components/common/LoadingComponent";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(redirectUrl);
      } else if (user && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, pathname, router]);

  if (isLoading) {
    return <LoadingComponent isFullPage message="Verifying role permissions..." />;
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

export default RoleGuard;
