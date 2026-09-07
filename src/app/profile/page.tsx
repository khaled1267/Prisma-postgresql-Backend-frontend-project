"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import userService from "@/services/user.service";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  Edit,
  CheckCircle2,
  AlertCircle,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Key,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openEditModal = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setNameError(null);
    setEmailError(null);
    setApiError(null);
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    setEmailError(null);
    setApiError(null);

    let hasError = false;

    if (!name.trim() || name.trim().length < 2) {
      setNameError("Full name must be at least 2 characters.");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (hasError || !user) return;

    setIsSubmitting(true);

    try {
      // Send API update request
      await userService.update(user.id, {
        name: name.trim(),
        email: email.trim(),
      });

      // Update AuthContext session state
      updateUser({
        name: name.trim(),
        email: email.trim(),
      });

      setIsEditModalOpen(false);
      setSuccessMessage("Your profile information has been successfully updated!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Failed to update profile changes.";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <ProtectedRoute>
      <PageContainer maxWidth="7xl" className="py-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <UserIcon className="w-4 h-4" />
            <span>Account Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            User <span className="gradient-title">Profile</span>
          </h1>
        </div>

        {/* Success Toast */}
        {successMessage && (
          <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: User Profile Identity Card */}
          <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl text-center space-y-4">
            
            {/* Avatar Circle */}
            <div className="relative w-24 h-24 mx-auto rounded-full ring-4 ring-primary/40 ring-offset-4 ring-offset-base-200 bg-primary/20 flex items-center justify-center text-primary font-black text-3xl shadow-xl">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <h2 className="text-xl font-bold text-base-content">{user.name}</h2>
              <p className="text-xs text-base-content/60 font-mono mt-0.5">{user.email}</p>
            </div>

            {/* Role Badge */}
            <div>
              {isAdmin ? (
                <span className="badge badge-accent font-bold text-xs gap-1 py-3 px-3 shadow-md">
                  <ShieldCheck className="w-4 h-4" /> ADMIN ROLE
                </span>
              ) : (
                <span className="badge badge-primary font-bold text-xs gap-1 py-3 px-3 shadow-md">
                  <UserIcon className="w-4 h-4" /> VERIFIED CUSTOMER
                </span>
              )}
            </div>

            <div className="pt-2 border-t border-base-300">
              <Button
                variant="outline"
                size="sm"
                isFullWidth
                onClick={openEditModal}
                leftIcon={<Edit className="w-4 h-4" />}
              >
                Edit Profile Information
              </Button>
            </div>

          </div>

          {/* Right 2 Columns: Detailed Info & Quick Shortcuts */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account Details Card */}
            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-base text-base-content border-b border-base-300 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Personal Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-3 bg-base-100/80 rounded-2xl border border-base-300 space-y-1">
                  <div className="text-base-content/50 font-bold flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-primary" /> Full Name
                  </div>
                  <div className="font-bold text-sm text-base-content">{user.name}</div>
                </div>

                <div className="p-3 bg-base-100/80 rounded-2xl border border-base-300 space-y-1">
                  <div className="text-base-content/50 font-bold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-info" /> Email Address
                  </div>
                  <div className="font-bold text-sm text-base-content font-mono">{user.email}</div>
                </div>

                <div className="p-3 bg-base-100/80 rounded-2xl border border-base-300 space-y-1">
                  <div className="text-base-content/50 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Account Role
                  </div>
                  <div className="font-bold text-sm text-base-content">{user.role}</div>
                </div>

                <div className="p-3 bg-base-100/80 rounded-2xl border border-base-300 space-y-1">
                  <div className="text-base-content/50 font-bold flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-warning" /> Account Reference ID
                  </div>
                  <div className="font-mono text-xs text-base-content/80 truncate">{user.id}</div>
                </div>

              </div>
            </div>

            {/* Quick Access Shortcuts */}
            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-base text-base-content border-b border-base-300 pb-3">
                Quick Shortcuts
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <Link href="/orders">
                  <div className="p-4 bg-base-100/80 hover:bg-base-100 rounded-2xl border border-base-300 hover:border-primary/50 transition flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-info/10 text-info group-hover:scale-110 transition">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-base-content">My Orders</div>
                      <div className="text-[10px] text-base-content/50">View order history & status</div>
                    </div>
                  </div>
                </Link>

                <Link href="/cart">
                  <div className="p-4 bg-base-100/80 hover:bg-base-100 rounded-2xl border border-base-300 hover:border-primary/50 transition flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-base-content">Shopping Cart</div>
                      <div className="text-[10px] text-base-content/50">Manage items & checkout</div>
                    </div>
                  </div>
                </Link>

                {isAdmin && (
                  <Link href="/admin">
                    <div className="p-4 bg-base-100/80 hover:bg-base-100 rounded-2xl border border-base-300 hover:border-accent/50 transition flex items-center gap-3 group sm:col-span-2">
                      <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition">
                        <Settings className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-base-content">Admin Control Panel</div>
                        <div className="text-[10px] text-base-content/50">Manage gadgets, categories, orders & users</div>
                      </div>
                    </div>
                  </Link>
                )}

              </div>

              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-error hover:bg-error/10"
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Sign Out of GadgetAI
                </Button>
              </div>
            </div>

          </div>

        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile Information"
          description="Update your full name and email address."
          footerActions={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdateProfile}
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save Profile Changes
              </Button>
            </>
          }
        >
          <form onSubmit={handleUpdateProfile} className="space-y-4 my-2">
            
            {/* API Error Alert */}
            {apiError && (
              <div className="alert alert-error shadow-lg rounded-2xl text-xs font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{apiError}</span>
              </div>
            )}

            <div>
              <label className="label py-1">
                <span className="label-text font-bold text-xs">Full Name</span>
              </label>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError || undefined}
                leftIcon={<UserIcon className="w-4 h-4 text-primary" />}
              />
            </div>

            <div>
              <label className="label py-1">
                <span className="label-text font-bold text-xs">Email Address</span>
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError || undefined}
                leftIcon={<Mail className="w-4 h-4 text-primary" />}
              />
            </div>

          </form>
        </Modal>

      </PageContainer>
    </ProtectedRoute>
  );
}
