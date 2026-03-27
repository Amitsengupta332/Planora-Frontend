"use client";

import * as React from "react";
import {
  CalendarDays,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Ticket,
  UserCog,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// const ADMIN_navMain = [
//   {
//     title: "Admin Dashboard",
//     url: "/dashboard",
//     icon: ShieldCheck,
//     isActive: true,
//     items: [
//       {
//         title: "Manage Users",
//         url: "/dashboard/manage-users",
//       },
//       {
//         title: "Manage Events",
//         url: "/dashboard/manage-events",
//       },
//       {
//         title: "Reviews",
//         url: "/dashboard/reviews",
//       },
//       {
//         title: "Settings",
//         url: "/dashboard/settings",
//       },
//     ],
//   },
// ];
const ADMIN_navMain = [
  {
    title: "Admin Dashboard",
    url: "/dashboard",
    icon: ShieldCheck,
    isActive: true,
    items: [
      {
        title: "Manage Users",
        url: "/dashboard/manage-users",
      },
      {
        title: "Manage Events",
        url: "/dashboard/manage-events",
      },
      {
        title: "Reviews",
        url: "/dashboard/reviews",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
      },
    ],
  },
];
const USER_navMain = [
  {
    title: "User Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "My Events",
        url: "/dashboard/my-events",
      },
      {
        title: "Invitations",
        url: "/dashboard/invitations",
      },
      {
        title: "My Reviews",
        url: "/dashboard/reviews",
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
      },
    ],
  },
  {
    title: "Event Tools",
    url: "#",
    icon: CalendarDays,
    items: [
      {
        title: "Browse Events",
        url: "/events",
      },
      {
        title: "Joined Events",
        url: "/dashboard/joined-events",
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "ADMIN" | "USER";
}

export default function AppSidebar({
  userRole = "USER",
  ...props
}: AppSidebarProps) {
  const navItem = userRole === "ADMIN" ? ADMIN_navMain : USER_navMain;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Ticket className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Planora</span>
            <span className="text-xs text-muted-foreground">
              {userRole === "ADMIN" ? "Admin Panel" : "User Panel"}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItem} />
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <div className="text-xs text-muted-foreground">
          {userRole === "ADMIN"
            ? "Manage platform activity"
            : "Manage your events and participation"}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}