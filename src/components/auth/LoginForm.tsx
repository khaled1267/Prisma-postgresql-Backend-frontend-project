"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

interface LoginFormProps {
  onSuccessRedirect: () => void;
}

export default function LoginForm({ onSuccessRedirect }: LoginFormProps) {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validate form fields client-side
  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error & backend error on edit
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Clear password field immediately
      setFormData({ email: "", password: "" });
      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        onSuccessRedirect();
      }, 1000);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiResponse<null>>;
      const msg =
        axiosError.response?.data?.message || "Invalid email or password. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-base-200 border border-base-300 shadow-2xl rounded-3xl p-6 sm:p-8">
      
      {/* Form Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-base-content">Welcome Back</h2>
        <p className="text-xs text-base-content/60 mt-1">
          Log in to access your GadgetAI marketplace account
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
      {errorMessage && (
        <ErrorComponent
          title="Login Failed"
          message={errorMessage}
          className="mb-6"
        />
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        
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
          disabled={isSubmitting || !!successMessage}
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
          disabled={isSubmitting || !!successMessage}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isFullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting || !!successMessage}
          className="mt-6"
        >
          {isSubmitting ? "Authenticating..." : "Sign In"}
        </Button>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs text-base-content/60 pt-4 border-t border-base-300">
        Don't have an account yet?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          Create Account
        </Link>
      </div>

    </div>
  );
}
