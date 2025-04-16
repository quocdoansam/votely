import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Outlet, useLocation, Link } from "react-router-dom";

export default function Page() {
  const location = useLocation();

  const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
    "/create-election": [
      { label: "Elections", href: "/" },
      { label: "Create Election" },
    ],
    "/": [{ label: "Home" }],
  };

  const breadcrumbs = breadcrumbMap[location.pathname] || [];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center justify-between w-full px-4'>
            <div className='flex items-center gap-2 grow'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <>
                      <BreadcrumbItem
                        key={`item-${index}`}
                        className={index === 0 ? "hidden md:block" : ""}
                      >
                        {item.href ? (
                          <BreadcrumbLink asChild>
                            <Link to={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>

                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator
                          key={`sep-${index}`}
                          className={index === 0 ? "hidden md:block" : ""}
                        />
                      )}
                    </>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </div>
        </header>
        <main className='flex-1 p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
