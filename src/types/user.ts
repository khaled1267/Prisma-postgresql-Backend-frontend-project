export type UserRole = "CUSTOMER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: UserRole;
}
