import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/layout/Layout";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

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
    <html lang="fa">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
}
