import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
 import { Toaster } from "@/components/ui/toaster";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen  px-2 lg:px-6 flex">
      <SidebarProvider >
        {/* Sidebar */}
          <AppSidebar  /> 
     

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col">
          {/* Sidebar Trigger (Sticky) */}
          <div className="h-12 px-4 flex items-center sticky top-12 z-50 w-fit">
            <SidebarTrigger  />
          </div>

          {/* Main Content */}
          <div className="  flex-1 py-9 px-2 lg:px-8">
            {children}
          </div>

        </div>
      </SidebarProvider>
      <Toaster/>
    </div>
  );
}
