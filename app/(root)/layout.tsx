import Footer from "../parts/Footer";
import Header from "../parts/Header";

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
