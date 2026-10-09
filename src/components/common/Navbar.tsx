"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  ShoppingCart,
  User,
  LogOut,
  ShieldCheck,
  PlusCircle,
  Settings,
  Package,
  Layers,
  Menu,
  X,
  Compass,
  Home,
  Sparkles,
} from "lucide-react";
import { APP_NAME } from "@/utils/constants";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper for active link highlighting
  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

  // Primary Navigation Links required by prompt
  const mainNavLinks = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Explore Gadgets", href: "/gadgets", icon: <Compass className="w-4 h-4" /> },
    { label: "Categories", href: "/categories", icon: <Layers className="w-4 h-4" /> },
    { label: "AI Copilot", href: "/assistant", icon: <Sparkles className="w-4 h-4 text-warning" /> },
  ];

  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-square btn-sm lg:hidden text-base-content/80"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 font-black text-xl tracking-tight hover:opacity-90 transition"
            >
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-primary to-secondary text-base-100 shadow-md shadow-primary/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-info to-secondary">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Auth / User State Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* UNAUTHENTICATED GUEST USER UI */}
            {!isAuthenticated && (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* AUTHENTICATED CUSTOMER & ADMIN UI */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-2">
                {/* Cart Button with badge */}
                <Link href="/cart">
                  <button className="btn btn-ghost btn-circle btn-sm relative text-base-content/80 hover:text-primary">
                    <ShoppingCart className="w-4 h-4" />
                    {cartCount > 0 && (
                      <span className="badge badge-xs badge-primary indicator-item font-bold absolute -top-1 -right-1">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>

                {/* Profile & Role Specific Dropdown */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar btn-sm">
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                        {user.name ? user.name.charAt(0) : "U"}
                      </div>
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-2xl w-56 border border-base-300 text-xs mt-3 gap-0.5"
                  >
                    <li className="px-3 py-2 border-b border-base-300/80 mb-1">
                      <div className="font-bold text-sm text-base-content p-0">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-base-content/50 p-0 truncate">
                        {user.email}
                      </div>
                    </li>

                    {/* Customer Links */}
                    <li>
                      <Link href="/profile">
                        <User className="w-4 h-4 text-info" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/cart">
                        <ShoppingCart className="w-4 h-4 text-info" /> Cart
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders">
                        <Package className="w-4 h-4 text-info" /> Orders
                      </Link>
                    </li>

                    {/* ADMIN USER SPECIFIC LINKS */}
                    {isAdmin && (
                      <>
                        <div className="divider my-1 text-[10px] uppercase font-bold text-accent">Admin Panel</div>
                        <li>
                          <Link href="/admin">
                            <Settings className="w-4 h-4 text-accent" /> Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/gadgets/add">
                            <PlusCircle className="w-4 h-4 text-accent" /> Add Gadget
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/gadgets">
                            <Compass className="w-4 h-4 text-accent" /> Manage Gadgets
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/orders">
                            <Package className="w-4 h-4 text-accent" /> Manage Orders
                          </Link>
                        </li>
                      </>
                    )}

                    <div className="divider my-1"></div>
                    <li>
                      <button onClick={logout} className="text-error hover:bg-error/10">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE & TABLET DRAWER NAVIGATION OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-base-300 bg-base-100 p-4 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 px-3 py-1">
              Navigation
            </div>
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/80 hover:bg-base-200"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-2 border-t border-base-300">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" size="sm" isFullWidth>
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  <Button variant="primary" size="sm" isFullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 px-3 py-1">
                  User Options ({user?.role})
                </div>
                <Link href="/profile" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs hover:bg-base-200">
                  <User className="w-4 h-4 text-info" /> Profile
                </Link>
                <Link href="/cart" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs hover:bg-base-200">
                  <ShoppingCart className="w-4 h-4 text-info" /> Cart
                </Link>
                <Link href="/orders" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs hover:bg-base-200">
                  <Package className="w-4 h-4 text-info" /> Orders
                </Link>

                {isAdmin && (
                  <>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-accent px-3 pt-2">
                      Admin Options
                    </div>
                    <Link href="/admin" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-accent hover:bg-base-200">
                      <Settings className="w-4 h-4" /> Admin Dashboard
                    </Link>
                    <Link href="/admin/gadgets/add" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-accent hover:bg-base-200">
                      <PlusCircle className="w-4 h-4" /> Add Gadget
                    </Link>
                    <Link href="/admin/gadgets" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-accent hover:bg-base-200">
                      <Compass className="w-4 h-4" /> Manage Gadgets
                    </Link>
                    <Link href="/admin/orders" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-accent hover:bg-base-200">
                      <Package className="w-4 h-4" /> Manage Orders
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-error hover:bg-error/10 mt-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
