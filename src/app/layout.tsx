import "./globals.css";
import { Providers } from "../store/provider";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ThemeEffect from "@/components/ThemeEffect"; // 👈 handles darkMode toggle

export const metadata = {
  title: "Dashboard",
  description: "Personalized Content Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <Providers>
          <ThemeEffect /> {/* 👈 updates <html> className dynamically */}
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
              {children}
            </main>
          </div>
          <SearchBar />
        </Providers>
      </body>
    </html>
  );
}
