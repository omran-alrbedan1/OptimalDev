import Footer from "@/components/parts/Footer";
import Header from "../../components/parts/Header";

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
