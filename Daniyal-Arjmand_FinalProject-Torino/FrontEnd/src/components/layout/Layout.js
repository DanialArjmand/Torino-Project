"use client";

import styles from "@/components/layout/Layout.module.css";
import Header from "./header/Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
