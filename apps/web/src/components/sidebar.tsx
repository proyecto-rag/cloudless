"use client";

import {
  LayoutDashboard,
  HardDrive,
  Server,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
  isCollapsed?: boolean;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "s3-buckets", label: "S3 Buckets", icon: HardDrive },
  { id: "ec2-instances", label: "EC2 Instances", icon: Server },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  activeItem = "s3-buckets",
  isCollapsed = false,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "glass-sidebar w-64 h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300",
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(148,163,184,0.1)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center glow-primary">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#0b1120]"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight">
                CloudMonitor
              </h1>
              <p className="text-xs text-[#94a3b8]">v2.4.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li key={item.id}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[rgba(6,182,212,0.15)] text-[#22d3ee] border border-[rgba(6,182,212,0.2)]"
                      : "text-[#94a3b8] hover:bg-[rgba(30,41,59,0.5)] hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-[#22d3ee]" : "text-[#64748b]"
                    )}
                  />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[rgba(148,163,184,0.1)]">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#06b6d4] flex items-center justify-center text-[#0b1120] font-bold">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Alex Morgan
              </p>
              <p className="text-xs text-[#94a3b8] truncate">DevOps Lead</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
