import Footer from "../parts/Footer";
import Header from "../parts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-white text-primary-color2 mx-0 font-poppins bg-foreground">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
