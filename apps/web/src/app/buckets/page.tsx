"use client";

import { use } from "react";
import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/stat-card";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Download,
  Plus,
  Bell,
  HelpCircle,
} from "lucide-react";

// Sample data matching the screenshot
const bucketsData = [
  {
    id: "1",
    name: "prod-assets-backup",
    region: "us-east-1",
    objectCount: "1,240,500",
    size: "2.1 TB",
    createdDate: "Oct 12, 2023",
    status: "healthy" as const,
    isPrivate: false,
  },
  {
    id: "2",
    name: "dev-logs-archive",
    region: "eu-central-1",
    objectCount: "450,000",
    size: "800 GB",
    createdDate: "Nov 01, 2023",
    status: "warning" as const,
    isPrivate: false,
  },
  {
    id: "3",
    name: "staging-media",
    region: "us-west-2",
    objectCount: "120,340",
    size: "300 GB",
    createdDate: "Dec 15, 2023",
    status: "healthy" as const,
    isPrivate: false,
  },
  {
    id: "4",
    name: "global-cdn-origin",
    region: "ap-southeast-1",
    objectCount: "2,100,892",
    size: "5.4 TB",
    createdDate: "Jan 02, 2024",
    status: "healthy" as const,
    isPrivate: false,
  },
  {
    id: "5",
    name: "finance-secure-vault",
    region: "us-east-2",
    objectCount: "10,234",
    size: "15 GB",
    createdDate: "Feb 20, 2024",
    status: "error" as const,
    isPrivate: true,
  },
  {
    id: "6",
    name: "marketing-assets",
    region: "us-west-1",
    objectCount: "85,000",
    size: "450 GB",
    createdDate: "Mar 10, 2024",
    status: "healthy" as const,
    isPrivate: false,
  },
  {
    id: "7",
    name: "analytics-warehouse",
    region: "eu-west-1",
    objectCount: "3,500,000",
    size: "8.2 TB",
    createdDate: "Jan 15, 2024",
    status: "healthy" as const,
    isPrivate: true,
  },
  {
    id: "8",
    name: "user-uploads",
    region: "us-east-1",
    objectCount: "520,000",
    size: "1.8 TB",
    createdDate: "Nov 28, 2023",
    status: "warning" as const,
    isPrivate: false,
  },
  {
    id: "9",
    name: "api-cache",
    region: "ap-northeast-1",
    objectCount: "2,300",
    size: "25 GB",
    createdDate: "Feb 05, 2024",
    status: "healthy" as const,
    isPrivate: false,
  },
  {
    id: "10",
    name: "legacy-migration",
    region: "eu-west-2",
    objectCount: "890,000",
    size: "3.1 TB",
    createdDate: "Dec 22, 2023",
    status: "error" as const,
    isPrivate: true,
  },
  {
    id: "11",
    name: "ml-training-data",
    region: "us-west-2",
    objectCount: "15,000",
    size: "120 GB",
    createdDate: "Jan 30, 2024",
    status: "healthy" as const,
    isPrivate: true,
  },
  {
    id: "12",
    name: "temp-processing",
    region: "eu-central-1",
    objectCount: "45,000",
    size: "180 GB",
    createdDate: "Mar 01, 2024",
    status: "healthy" as const,
    isPrivate: false,
  },
];

interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function BucketsDashboard({ params, searchParams }: PageProps) {
  // Unwrap params and searchParams using React.use() for Next.js 15+ compatibility
  // These must be unwrapped even if not used, to avoid the "params is a Promise" error
  use(params);
  use(searchParams);

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Sidebar activeItem="s3-buckets" />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-[rgba(148,163,184,0.1)]">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-white">S3 Buckets</h1>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <Input
                  type="text"
                  placeholder="Search buckets..."
                  className="w-72 pl-10 bg-[rgba(30,41,59,0.5)] border-[rgba(148,163,184,0.2)] text-white placeholder:text-[#64748b] focus:border-[#06b6d4] focus:ring-[#06b6d4]"
                />
              </div>

              <button className="p-2 rounded-lg hover:bg-[rgba(30,41,59,0.5)] transition-colors">
                <Bell className="w-5 h-5 text-[#94a3b8]" />
              </button>

              <button className="p-2 rounded-lg hover:bg-[rgba(30,41,59,0.5)] transition-colors">
                <HelpCircle className="w-5 h-5 text-[#94a3b8]" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Buckets"
              value="12"
              change="↗ 2%"
              icon="buckets"
              trend="up"
            />
            <StatCard
              title="Total Storage"
              value="4.5 TB"
              change="↗ 150GB"
              icon="storage"
              trend="up"
            />
            <StatCard
              title="Active Regions"
              value="3"
              change="0% change"
              icon="regions"
              trend="neutral"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-[rgba(30,41,59,0.5)] border-[rgba(148,163,184,0.2)] text-[#94a3b8] hover:bg-[rgba(30,41,59,0.7)] hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>

              <Button
                variant="outline"
                className="bg-[rgba(30,41,59,0.5)] border-[rgba(148,163,184,0.2)] text-[#94a3b8] hover:bg-[rgba(30,41,59,0.7)] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <Button className="bg-[#06b6d4] hover:bg-[#0891b2] text-[#0b1120] font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Create Bucket
            </Button>
          </div>

          {/* Data Table */}
          <DataTable buckets={bucketsData} />
        </div>
      </main>
    </div>
  );
}
