import Footer from "../parts/Footer";
import Header from "../parts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className=" mx-0 border border-black  font-poppins bg-foreground text-white">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
