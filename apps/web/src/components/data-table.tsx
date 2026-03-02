"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Folder,
  Lock,
  MoreVertical,
} from "lucide-react";

interface Bucket {
  id: string;
  name: string;
  region: string;
  objectCount: string;
  size: string;
  createdDate: string;
  status: "healthy" | "warning" | "error";
  isPrivate: boolean;
}

interface DataTableProps {
  buckets: Bucket[];
}

const statusConfig = {
  healthy: {
    label: "Healthy",
    dotColor: "bg-emerald-500",
    textColor: "text-emerald-400",
  },
  warning: {
    label: "Warning",
    dotColor: "bg-amber-500",
    textColor: "text-amber-400",
  },
  error: {
    label: "Error",
    dotColor: "bg-red-500",
    textColor: "text-red-400",
  },
};

export function DataTable({ buckets }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(buckets.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBuckets = buckets.slice(startIndex, endIndex);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(148,163,184,0.1)] bg-[rgba(15,23,42,0.3)]">
        <div className="col-span-1 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
          Status
        </div>
        <div className="col-span-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
          Bucket Name
        </div>
        <div className="col-span-2 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
          Region
        </div>
        <div className="col-span-2 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-right">
          Object Count
        </div>
        <div className="col-span-2 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-right">
          Size
        </div>
        <div className="col-span-1 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
          Created
        </div>
        <div className="col-span-1 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider text-center">
          Actions
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[rgba(148,163,184,0.05)]">
        {currentBuckets.map((bucket, index) => {
          const status = statusConfig[bucket.status];

          return (
            <div
              key={bucket.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[rgba(6,182,212,0.03)] transition-colors duration-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Status */}
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full status-dot",
                      status.dotColor
                    )}
                  />
                  <span className={cn("text-sm font-medium", status.textColor)}>
                    {status.label}
                  </span>
                </div>
              </div>

              {/* Bucket Name */}
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  {bucket.isPrivate ? (
                    <Lock className="w-4 h-4 text-[#94a3b8]" />
                  ) : (
                    <Folder className="w-4 h-4 text-[#22d3ee]" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {bucket.name}
                  </span>
                </div>
              </div>

              {/* Region */}
              <div className="col-span-2">
                <span className="text-sm text-[#94a3b8]">{bucket.region}</span>
              </div>

              {/* Object Count */}
              <div className="col-span-2 text-right">
                <span className="text-sm text-white">{bucket.objectCount}</span>
              </div>

              {/* Size */}
              <div className="col-span-2 text-right">
                <span className="text-sm text-white">{bucket.size}</span>
              </div>

              {/* Created Date */}
              <div className="col-span-1">
                <span className="text-sm text-[#94a3b8]">
                  {bucket.createdDate}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-center">
                <button className="p-1.5 rounded-md hover:bg-[rgba(148,163,184,0.1)] transition-colors">
                  <MoreVertical className="w-4 h-4 text-[#64748b]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(148,163,184,0.1)] bg-[rgba(15,23,42,0.3)]">
        <p className="text-sm text-[#94a3b8]">
          Showing{" "}
          <span className="text-white font-medium">{startIndex + 1}</span> to{" "}
          <span className="text-white font-medium">
            {Math.min(endIndex, buckets.length)}
          </span>{" "}
          of <span className="text-white font-medium">{buckets.length}</span>{" "}
          buckets
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              currentPage === 1
                ? "bg-[rgba(30,41,59,0.3)] text-[#64748b] cursor-not-allowed"
                : "bg-[rgba(30,41,59,0.5)] text-white hover:bg-[rgba(30,41,59,0.7)] border border-[rgba(148,163,184,0.2)]"
            )}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              currentPage === totalPages
                ? "bg-[rgba(30,41,59,0.3)] text-[#64748b] cursor-not-allowed"
                : "bg-[rgba(30,41,59,0.5)] text-white hover:bg-[rgba(30,41,59,0.7)] border border-[rgba(148,163,184,0.2)]"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
