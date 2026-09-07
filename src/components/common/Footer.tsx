import Link from "next/link";
import { Cpu, ShieldCheck, Heart, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { APP_NAME } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-black text-xl text-primary">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-primary to-secondary text-base-100 shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-info to-secondary">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-xs text-base-content/70 leading-relaxed max-w-sm">
              Next-generation marketplace for AI wearables, smart electronics, autonomous drones, and futuristic automation gear.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="badge badge-sm badge-success gap-1 text-[10px] font-bold text-base-100">
                <ShieldCheck className="w-3 h-3" /> Deployed on Render
              </span>
              <span className="badge badge-sm badge-outline text-[10px] text-base-content/60">
                Prisma ORM
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-base-content mb-3 uppercase tracking-wider text-[11px] text-primary">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-base-content/70">
              <li>
                <Link href="/" className="hover:text-primary transition">Home</Link>
              </li>
              <li>
                <Link href="/gadgets" className="hover:text-primary transition">Explore Gadgets</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition">Categories</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-sm text-base-content mb-3 uppercase tracking-wider text-[11px] text-primary">
              Account & Help
            </h4>
            <ul className="space-y-2 text-xs text-base-content/70">
              <li>
                <Link href="/login" className="hover:text-primary transition">Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition">Create Account</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition">My Cart</Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary transition">Track Orders</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-base-content mb-3 uppercase tracking-wider text-[11px] text-primary">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-base-content/70">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>support@gadgetai.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>+1 (800) 555-GADGET</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Silicon Valley, CA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-base-300/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-base-content/50">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
