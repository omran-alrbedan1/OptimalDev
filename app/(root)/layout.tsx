export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans bg-foreground text-white">
      hello{children}
    </main>
  );
}
