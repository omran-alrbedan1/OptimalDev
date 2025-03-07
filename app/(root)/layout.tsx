import Header from "../parts/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-poppins bg-foreground text-white">
      <Header />
      {children}
    </main>
  );
}
