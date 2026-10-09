"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useRegisterMutation } from "@/hooks/useAuthMutations";

interface RegisterFormProps {
  onSuccessRedirect: () => void;
}

export default function RegisterForm({ onSuccessRedirect }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registerMutation = useRegisterMutation();

  // Validate form fields client-side
  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on edit
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Send payload matching backend POST /api/auth/register contract
    registerMutation.mutate(
      {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      },
      {
        onSuccess: () => {
          setSuccessMessage("Account registered successfully! Redirecting to login...");
          // Clear sensitive password fields immediately from client memory
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          
          setTimeout(() => {
            onSuccessRedirect();
          }, 1500);
        },
      }
    );
  };

  const backendErrorMessage =
    registerMutation.error?.response?.data?.message ||
    (registerMutation.isError ? "Registration failed. Please check your details and try again." : null);

  return (
    <div className="surface-panel mx-auto w-full max-w-md rounded-3xl p-6 sm:p-8">
      
      {/* Form Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mx-auto mb-3">
          <UserPlus className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-base-content">Create an Account</h2>
        <p className="text-xs text-base-content/60 mt-1">
          Join GadgetAI Marketplace for smart hardware recommendations
        </p>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="alert alert-success shadow-lg text-white mb-6 rounded-2xl text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Backend Error Alert */}
      {backendErrorMessage && (
        <ErrorComponent
          title="Registration Error"
          message={backendErrorMessage}
          className="mb-6"
        />
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        
        {/* Full Name Field */}
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          leftIcon={<User className="w-4 h-4" />}
          disabled={registerMutation.isPending || !!successMessage}
        />

        {/* Email Address Field */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          leftIcon={<Mail className="w-4 h-4" />}
          disabled={registerMutation.isPending || !!successMessage}
        />

        {/* Password Field */}
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none hover:text-primary transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          disabled={registerMutation.isPending || !!successMessage}
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none hover:text-primary transition"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          disabled={registerMutation.isPending || !!successMessage}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isFullWidth
          isLoading={registerMutation.isPending}
          disabled={registerMutation.isPending || !!successMessage}
          className="mt-6"
        >
          {registerMutation.isPending ? "Registering..." : "Create Account"}
        </Button>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs text-base-content/60 pt-4 border-t border-base-300">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Sign In
        </Link>
      </div>

    </div>
  );
}
