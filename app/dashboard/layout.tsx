import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
    <SidebarProvider>
      <AppSidebar />
      
        <SidebarTrigger />
       
      
    </SidebarProvider>
    {children}
    </main>

  
  )
}
