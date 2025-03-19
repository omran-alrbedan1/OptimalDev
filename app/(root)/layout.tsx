import Footer from "../parts/Footer";
import Header from "../parts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className=" mx-0 font-poppins bg-foreground">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
