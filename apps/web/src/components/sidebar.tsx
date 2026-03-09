"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCard,
  HardDrive,
  LayoutDashboard,
  LogOut,
  Server,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/" },
  {
    id: "ec2-instances",
    label: "EC2 Instances",
    icon: Server,
    href: "/instances",
  },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HardDrive className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">CloudMonitor</p>
            <p className="text-xs text-muted-foreground">v2.4.0</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="py-3">
          <SidebarMenu>
            {menuItems.map((menuItem) => {
              const Icon = menuItem.icon;
              const isActive =
                menuItem.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(menuItem.href);

              return (
                <SidebarMenuItem key={menuItem.id}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={menuItem.href}>
                      <Icon />
                      <span>{menuItem.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md bg-muted/40 p-3 text-left transition hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                AM
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Alex Morgan</p>
                <p className="truncate text-xs text-muted-foreground">
                  DevOps Lead
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            sideOffset={8}
            className="flex flex-col gap-1 rounded-xl border border-border/50 bg-popover p-2 shadow-lg"
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-accent/50"
            >
              <User className="size-4 text-muted-foreground" />
              <span>My profile</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-accent/50"
            >
              <CreditCard className="size-4 text-muted-foreground" />
              <span>Subscription</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
            >
              <LogOut className="size-4 text-destructive" />
              <span>Sign out</span>
            </button>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
