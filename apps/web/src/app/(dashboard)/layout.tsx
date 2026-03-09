"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function BucketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const payload = await response.json();
        if (payload?.authenticated !== true) {
          throw new Error("Invalid auth status response");
        }

        if (isMounted) {
          setIsAuthorized(true);
        }
      } catch {
        router.replace("/login");
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    void verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b1120] px-4 text-sm text-slate-200">
        Verifying session...
      </main>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
