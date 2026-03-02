"use client";

import { cn } from "@/lib/utils";
import {
  HardDrive,
  Database,
  Globe,
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: "buckets" | "storage" | "regions";
  trend?: "up" | "down" | "neutral";
}

const iconMap: Record<string, LucideIcon> = {
  buckets: HardDrive,
  storage: Database,
  regions: Globe,
};

export function StatCard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
}: StatCardProps) {
  const Icon = iconMap[icon];

  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-[#94a3b8]",
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up hover:border-[rgba(6,182,212,0.3)] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#94a3b8] mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {change && (
              <span className={cn("text-sm font-medium", trendColors[trend])}>
                {change}
              </span>
            )}
          </div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.1)] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#22d3ee]" />
        </div>
      </div>
    </div>
  );
}
