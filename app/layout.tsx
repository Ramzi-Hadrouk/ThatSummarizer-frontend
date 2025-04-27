import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/ui/theme-provider"
import ApiService from "@/utils/classes/api-service-class";
import { globalSections } from '@/utils/objects/query-objects';
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "That Summarizer",
  description: "Summarizing YouTube videos",
};

export default  async function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {


  const queryObject = globalSections

  const api = new ApiService();
  const data = await api.getData('/api/global', queryObject, false)
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} >
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        
          <Header  data={data?.data?.attributes?.header}/>
          {children}
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
} 
