"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  PlusCircle,
  Layers,
  Package,
  Users,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Manage Gadgets", href: "/admin/gadgets", icon: <Compass className="w-4 h-4" /> },
    { label: "Add New Gadget", href: "/admin/gadgets/add", icon: <PlusCircle className="w-4 h-4" /> },
    { label: "Category Divisions", href: "/categories", icon: <Layers className="w-4 h-4" /> },
    { label: "Manage Orders", href: "/admin/orders", icon: <Package className="w-4 h-4" /> },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Collapsible Navigation Button */}
      <div className="lg:hidden bg-base-200 border-b border-base-300 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-accent text-base-100 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-black text-sm text-base-content uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="btn btn-ghost btn-square btn-sm text-base-content"
          aria-label="Toggle admin sidebar"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container: Desktop persistent, Mobile overlay */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-base-200 border-r border-base-300 p-5 flex flex-col justify-between transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-base-300">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-accent to-primary text-base-100 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-base text-base-content tracking-tight">Admin Console</h2>
              <span className="badge badge-accent badge-xs font-bold uppercase text-[9px]">
                RBAC Authorized
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 px-3 py-1">
              Menu Navigation
            </div>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-accent text-accent-content shadow-lg shadow-accent/20"
                      : "text-base-content/70 hover:bg-base-300/60 hover:text-base-content"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="pt-4 border-t border-base-300 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-base-100/70 rounded-2xl border border-base-300">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-black text-xs flex items-center justify-center border border-accent/40">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-xs text-base-content truncate">{user?.name}</div>
              <div className="text-[10px] text-base-content/50 truncate">{user?.email}</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="btn btn-ghost btn-sm w-full text-error hover:bg-error/10 text-xs justify-start gap-2 rounded-xl"
          >
            <LogOut className="w-4 h-4" /> Sign Out Admin
          </button>
        </div>
      </aside>
    </>
  );
}
