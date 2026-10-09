"use client";

import { FormEvent, useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ErrorComponent from "@/components/common/ErrorComponent";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useCategories, useCreateCategoryMutation } from "@/hooks/useCategories";
import categoryService from "@/services/category.service";
import productService from "@/services/product.service";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Layers, PlusCircle, Sparkles } from "lucide-react";

const SAMPLE_PRODUCT_TARGET = 30;

const sampleProducts = [
  { title: "PulseFit Pro Smart Watch", category: "Smart Watch", description: "Sample listing: AMOLED display, heart-rate tracking, and GPS.", price: 129.99, stock: 20 },
  { title: "AeroSound Wireless Headphones", category: "Audio", description: "Sample listing: over-ear wireless headphones with noise cancellation.", price: 89.99, stock: 18 },
  { title: "NovaBook Air 14 Laptop", category: "Laptops", description: "Sample listing: lightweight 14-inch laptop for everyday work.", price: 899.99, stock: 8 },
  { title: "HomeSense Smart Speaker", category: "Smart Home", description: "Sample listing: voice-controlled smart speaker for the home.", price: 69.99, stock: 24 },
  { title: "PixelWave 5G Smartphone", category: "Smartphones", description: "Sample listing: 5G smartphone with a high-resolution display.", price: 649.99, stock: 12 },
  { title: "GameCore Wireless Controller", category: "Gaming", description: "Sample listing: wireless controller with responsive controls.", price: 59.99, stock: 25 },
  { title: "PulseFit Lite Smart Watch", category: "Smart Watch", description: "Sample listing: lightweight fitness watch with sleep tracking.", price: 59.99, stock: 30 },
  { title: "StudioPods Pro Earbuds", category: "Audio", description: "Sample listing: compact earbuds with active noise cancellation.", price: 119.99, stock: 16 },
  { title: "NovaBook Studio 16 Laptop", category: "Laptops", description: "Sample listing: 16-inch laptop designed for creative workloads.", price: 1499.99, stock: 6 },
  { title: "HomeSense Smart Hub", category: "Smart Home", description: "Sample listing: central hub for compatible smart-home devices.", price: 99.99, stock: 14 },
  { title: "PixelWave Mini Smartphone", category: "Smartphones", description: "Sample listing: compact smartphone with all-day battery life.", price: 499.99, stock: 11 },
  { title: "GameCore Compact Gaming Headset", category: "Gaming", description: "Sample listing: comfortable gaming headset with a clear microphone.", price: 79.99, stock: 17 },
  { title: "PulseFit Active Smart Watch", category: "Smart Watch", description: "Sample listing: water-resistant smartwatch for active lifestyles.", price: 149.99, stock: 13 },
  { title: "AeroSound Studio Headphones", category: "Audio", description: "Sample listing: studio-style headphones with balanced sound.", price: 139.99, stock: 10 },
  { title: "NovaBook Flex 13 Laptop", category: "Laptops", description: "Sample listing: convertible touchscreen laptop for work and travel.", price: 1099.99, stock: 7 },
  { title: "HomeSense Smart Bulb Kit", category: "Smart Home", description: "Sample listing: app-controlled color lighting starter kit.", price: 39.99, stock: 32 },
  { title: "PixelWave Max Smartphone", category: "Smartphones", description: "Sample listing: large-screen smartphone with a multi-camera system.", price: 899.99, stock: 9 },
  { title: "GameCore Mechanical Gaming Keyboard", category: "Gaming", description: "Sample listing: mechanical keyboard with customizable lighting.", price: 109.99, stock: 15 },
  { title: "PulseFit Classic Smart Watch", category: "Smart Watch", description: "Sample listing: classic-style smartwatch with activity tracking.", price: 99.99, stock: 21 },
  { title: "AeroSound Pocket Bluetooth Speaker", category: "Audio", description: "Sample listing: portable Bluetooth speaker with water resistance.", price: 49.99, stock: 28 },
  { title: "NovaBook Everyday 15 Laptop", category: "Laptops", description: "Sample listing: versatile 15-inch laptop for home and office.", price: 749.99, stock: 10 },
  { title: "HomeSense Video Doorbell", category: "Smart Home", description: "Sample listing: connected video doorbell with motion alerts.", price: 129.99, stock: 12 },
  { title: "PixelWave Fold Smartphone", category: "Smartphones", description: "Sample listing: foldable smartphone with an expansive inner display.", price: 1299.99, stock: 5 },
  { title: "GameCore RGB Gaming Mouse", category: "Gaming", description: "Sample listing: adjustable gaming mouse with programmable buttons.", price: 44.99, stock: 26 },
  { title: "PulseFit Endurance Smart Watch", category: "Smart Watch", description: "Sample listing: GPS smartwatch with extended battery life.", price: 189.99, stock: 9 },
  { title: "StudioPods Air Earbuds", category: "Audio", description: "Sample listing: true wireless earbuds with a compact charging case.", price: 79.99, stock: 22 },
  { title: "NovaBook Pro 14 Laptop", category: "Laptops", description: "Sample listing: performance laptop with a high-resolution display.", price: 1299.99, stock: 6 },
  { title: "HomeSense Smart Plug Four-Pack", category: "Smart Home", description: "Sample listing: remotely controlled outlet set with energy monitoring.", price: 34.99, stock: 35 },
];

export default function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  const { data: categories, isLoading, isError, error } = useCategories();
  const createCategory = useCreateCategoryMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSeedingCatalog, setIsSeedingCatalog] = useState(false);
  const [catalogMessage, setCatalogMessage] = useState<string | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const handleAddSampleCatalog = async () => {
    setCatalogMessage(null);
    setCatalogError(null);
    setIsSeedingCatalog(true);

    let addedProducts = 0;
    let addedCategories = 0;

    try {
      const existingProducts = await productService.getAll();
      if (existingProducts.length >= SAMPLE_PRODUCT_TARGET) {
        setCatalogMessage(
          `The marketplace already has ${existingProducts.length} gadgets; no sample products were added.`
        );
        return;
      }

      const remainingCount = SAMPLE_PRODUCT_TARGET - existingProducts.length;
      const existingTitles = new Set(
        existingProducts.map((product) => product.title.trim().toLowerCase())
      );
      const productsToAdd = sampleProducts
        .filter((product) => !existingTitles.has(product.title.toLowerCase()))
        .slice(0, remainingCount);

      const latestCategories = await categoryService.getAll();
      const categoryIds = new Map(
        latestCategories.map((category) => [category.name.trim().toLowerCase(), category.id])
      );
      const requiredCategories = [...new Set(productsToAdd.map((product) => product.category))];

      for (const categoryName of requiredCategories) {
        const key = categoryName.toLowerCase();
        if (!categoryIds.has(key)) {
          const category = await categoryService.create({
            name: categoryName,
            description: `Sample category for ${categoryName.toLowerCase()} gadgets.`,
          });
          categoryIds.set(key, category.id);
          addedCategories += 1;
        }
      }

      for (const product of productsToAdd) {
        const categoryId = categoryIds.get(product.category.toLowerCase());
        if (!categoryId) {
          throw new Error(`Category "${product.category}" could not be found or created.`);
        }

        await productService.create({
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId,
        });
        addedProducts += 1;
      }

      setCatalogMessage(
        `Added ${addedProducts} sample gadgets and ${addedCategories} categories.`
      );
    } catch (catalogCreationError) {
      const message =
        catalogCreationError instanceof Error
          ? catalogCreationError.message
          : "An unexpected error occurred while adding the sample catalog.";
      setCatalogError(
        addedProducts || addedCategories
          ? `${message} Added ${addedProducts} gadgets and ${addedCategories} categories before the error.`
          : message
      );
    } finally {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["categories"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);
      setIsSeedingCatalog(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError("Category name is required.");
      return;
    }

    createCategory.mutate(
      {
        name: trimmedName,
        description: description.trim() || undefined,
      },
      {
        onSuccess: (category) => {
          setName("");
          setDescription("");
          setSuccessMessage(`Category "${category.name}" was added successfully.`);
        },
        onError: (mutationError) => {
          setFormError(
            mutationError.response?.data?.message ??
              mutationError.message ??
              "Failed to add category. Please try again."
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
            title="Manage Categories"
            description="Add hardware categories to make them available when creating gadgets."
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section className="space-y-4 rounded-3xl border border-primary/30 bg-primary/5 p-5 shadow-xl sm:p-6 xl:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Sample Gadget Catalog
                  </h2>
                  <p className="mt-1 text-xs text-base-content/70">
                    Add sample listings and required categories until the marketplace has 30 gadgets.
                    Existing listings are kept. Sample prices and stock are placeholders.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  isLoading={isSeedingCatalog}
                  onClick={handleAddSampleCatalog}
                  leftIcon={<Sparkles className="h-4 w-4" />}
                >
                  Add Sample Catalog
                </Button>
              </div>
              {catalogError && (
                <ErrorComponent title="Sample catalog was not fully added" message={catalogError} />
              )}
              {catalogMessage && (
                <div className="alert alert-success rounded-2xl text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{catalogMessage}</span>
                </div>
              )}
            </section>

            <section className="space-y-5 rounded-3xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Add a Category</h2>
                  <p className="text-xs text-base-content/60">
                    New categories will appear in the gadget form.
                  </p>
                </div>
              </div>

              {formError && (
                <ErrorComponent title="Unable to add category" message={formError} />
              )}
              {successMessage && (
                <div className="alert alert-success rounded-2xl text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Category name *"
                  placeholder="e.g. Smart Home"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={100}
                  required
                />
                <div className="form-control w-full">
                  <label htmlFor="category-description" className="label py-1">
                    <span className="label-text text-xs font-medium text-base-content/80">
                      Description
                    </span>
                  </label>
                  <textarea
                    id="category-description"
                    className="textarea textarea-bordered min-h-24 w-full rounded-xl bg-base-200/50"
                    placeholder="Optional details about this category"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={500}
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={createCategory.isPending}
                  leftIcon={<PlusCircle className="h-4 w-4" />}
                >
                  Add Category
                </Button>
              </form>
            </section>

            <section className="space-y-4 rounded-3xl border border-base-300 bg-base-200 p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Existing Categories</h2>
                  <p className="text-xs text-base-content/60">
                    {categories?.length ?? 0} available
                  </p>
                </div>
                <Layers className="h-5 w-5 text-primary" />
              </div>

              {isError && (
                <ErrorComponent
                  title="Failed to load categories"
                  message={error.message}
                />
              )}
              {isLoading ? (
                <LoadingComponent message="Loading categories..." />
              ) : !isError ? (
                categories?.length ? (
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className="rounded-xl border border-base-300 bg-base-100 p-3"
                      >
                        <p className="font-semibold">{category.name}</p>
                        {category.description && (
                          <p className="mt-1 text-xs text-base-content/60">
                            {category.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60">
                    No categories yet. Add one to use it when creating a gadget.
                  </div>
                )
              ) : null}
            </section>
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
