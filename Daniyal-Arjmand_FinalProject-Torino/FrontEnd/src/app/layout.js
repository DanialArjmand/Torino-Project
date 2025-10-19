import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "تورینو | آژانس مسافرتی",
  description: "بهترین تورهای داخلی و خارجی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ModalProvider>
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: "var(--font-iransans)",
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <Layout>{children}</Layout>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
