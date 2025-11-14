"use client";

import Link from "next/link";
import { Leaf, House, Gauge } from "phosphor-react";

export function Navbar() {
  return (
    <nav className="glass border-b border-white/20 shadow-soft-lg rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Leaf size={28} weight="fill" className="text-emerald-600" />
            </div>
            <span className="text-xl font-bold gradient-text">FloraPro</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://dankehidayat.my.id"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-white/50 rounded-xl transition-all duration-200 group"
            >
              <House size={20} weight="duotone" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              href="https://flowpoint.dankehidayat.my.id"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-white/50 rounded-xl transition-all duration-200 group"
            >
              <Gauge size={20} weight="duotone" />
              <span className="font-medium">Energy Monitor</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
