import Footer from "@/components/parts/Footer";
import Header from "../../components/parts/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MobileNav from "@/components/parts/MobileNav";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="dark:bg-darkMod-500 dark:text-white mx-0 font-poppins">
      <Header />
      {children}

      <Footer />
    </main>
  );
}
