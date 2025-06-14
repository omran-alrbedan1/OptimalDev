"use client";
import Footer from "@/components/parts/Footer";
import Header from "../../components/parts/Header";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="dark:bg-darkMod-500 dark:text-white mx-0 font-poppins">
      <Provider store={store}>
        <Header />
        {children}
        <Footer />
      </Provider>
    </main>
  );
}
