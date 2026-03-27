import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
// import { getCurrentUser } from "@/services/auth";
import AppSidebar from "@/components/app-sidebar";
 
import { getCurrentUserServer } from "@/services/auth/server";

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const userinfo = await getCurrentUserServer();
  const role = userinfo?.role;

  // const role =
  //   userinfo?.role === "ADMIN" || userinfo?.role === "USER"
  //     ? userinfo.role
  //     : undefined;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar userRole={role} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Build Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              {/* {admin}
              {user} */}
              {/* {role === Roles.admin ? admin : user} */}
              {role === "ADMIN" ? admin : user}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
