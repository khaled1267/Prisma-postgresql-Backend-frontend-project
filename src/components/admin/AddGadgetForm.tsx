"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProductMutation } from "@/hooks/useProductMutations";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import {
  PlusCircle,
  Tag,
  DollarSign,
  PackageCheck,
  ImageIcon,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function AddGadgetForm() {
  const router = useRouter();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();
  const createProductMutation = useCreateProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Gadget title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (formData.stock === "") {
      newErrors.stock = "Stock quantity is required";
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a hardware category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    createProductMutation.mutate(
      {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image.trim() || undefined,
        categoryId: formData.categoryId,
      },
      {
        onSuccess: (data) => {
          setSuccessMessage(`Product "${data.title}" successfully created! Redirecting to Manage Gadgets...`);
          setTimeout(() => {
            router.push("/admin/gadgets");
          }, 1500);
        },
        onError: (err) => {
          const msg =
            err.response?.data?.message || err.message || "Failed to create gadget. Please try again.";
          setServerError(msg);
        },
      }
    );
  };

  const isSubmitting = createProductMutation.isPending;
  const imagePreview = formData.image.trim() ? formData.image.trim() : DEFAULT_PRODUCT_IMAGE;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Success Notification */}
      {successMessage && (
        <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Server Error Alert */}
      {serverError && (
        <div className="alert alert-error shadow-lg rounded-2xl text-xs font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-2 space-y-5 bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
          
          {/* Gadget Title */}
          <div>
            <label className="label">
              <span className="label-text font-bold text-xs">Gadget Title *</span>
            </label>
            <Input
              placeholder="e.g. Neural Core X1 Wearable"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              leftIcon={<FileText className="w-4 h-4 text-primary" />}
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="label">
              <span className="label-text font-bold text-xs flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-primary" /> Category Division *
              </span>
            </label>
            <select
              className={`select select-bordered w-full bg-base-100 rounded-xl text-xs font-semibold ${
                errors.categoryId ? "select-error" : ""
              }`}
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              disabled={isLoadingCategories}
              aria-label="Select gadget category"
            >
              <option value="">
                {isLoadingCategories
                  ? "Loading categories..."
                  : isCategoriesError
                    ? "Could not load categories"
                    : categories?.length
                      ? "Select Hardware Category..."
                      : "No categories available"}
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {isCategoriesError && (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-error">
                <span>{categoriesError.message}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => refetchCategories()}
                >
                  <RefreshCw className="h-3 w-3" /> Retry
                </button>
              </div>
            )}
            {!isLoadingCategories && !isCategoriesError && !categories?.length && (
              <p className="mt-2 text-xs text-base-content/70">
                No categories have been added yet.{" "}
                <Link
                  href="/admin/categories"
                  className="font-semibold text-primary underline"
                >
                  Add a category
                </Link>
                , then return here to select it.
                <button
                  type="button"
                  className="ml-2 inline-flex items-center gap-1 font-semibold text-primary underline"
                  onClick={() => refetchCategories()}
                >
                  <RefreshCw className="h-3 w-3" /> Refresh
                </button>
              </p>
            )}
            {errors.categoryId && (
              <span className="text-xs text-error mt-1 block font-medium">
                {errors.categoryId}
              </span>
            )}
          </div>

          {/* Price & Stock Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text font-bold text-xs">Price ($ USD) *</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="299.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                error={errors.price}
                leftIcon={<DollarSign className="w-4 h-4 text-primary" />}
              />
            </div>

            {/* Stock */}
            <div>
              <label className="label">
                <span className="label-text font-bold text-xs">Stock Units *</span>
              </label>
              <Input
                type="number"
                min="0"
                placeholder="50"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                error={errors.stock}
                leftIcon={<PackageCheck className="w-4 h-4 text-primary" />}
              />
            </div>

          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text font-bold text-xs">Image URL (Optional)</span>
            </label>
            <Input
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              leftIcon={<ImageIcon className="w-4 h-4 text-primary" />}
            />
            <span className="text-[10px] text-base-content/50 mt-1 block">
              Provide a direct image URL or leave blank to use the default fallback gadget image.
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text font-bold text-xs">Product Description (Optional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-base-100 rounded-xl text-xs leading-relaxed h-28"
              placeholder="Provide technical specifications, hardware specs, and key features..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

        </div>

        {/* Right Column: Live Image Preview & Actions */}
        <div className="space-y-6">
          <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
              Live Product Card Preview
            </h3>

            <div className="relative h-48 w-full bg-base-300 rounded-2xl overflow-hidden border border-base-300 shadow-inner">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="text-left space-y-1">
              <div className="font-bold text-sm text-base-content truncate">
                {formData.title || "Sample Gadget Title"}
              </div>
              <div className="text-primary font-black text-lg">
                ${formData.price ? Number(formData.price).toFixed(2) : "0.00"}
              </div>
              <div className="text-[11px] text-base-content/60">
                Stock: {formData.stock ? formData.stock : "0"} units
              </div>
            </div>
          </div>

          {/* Form Submit & Cancel Actions */}
          <div className="space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isFullWidth
              isLoading={isSubmitting}
              leftIcon={<PlusCircle className="w-5 h-5" />}
            >
              {isSubmitting ? "Creating Gadget..." : "Create Gadget Listing"}
            </Button>

            <Link href="/admin/gadgets" className="block">
              <Button
                variant="outline"
                size="md"
                isFullWidth
                disabled={isSubmitting}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Cancel & Return
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </form>
  );
}
