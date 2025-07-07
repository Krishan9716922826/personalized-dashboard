import "./globals.css";
import { Providers } from "../store/provider";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Personalized Content Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 bg-white dark:bg-gray-950 text-black dark:text-white">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

