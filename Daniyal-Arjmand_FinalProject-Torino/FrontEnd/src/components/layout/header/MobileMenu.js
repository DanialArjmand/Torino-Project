"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/layout/Layout.module.css";

function MobileMenu() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const mobileMenuRef = useRef(null);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMobileMenuClosing(false);
      }, 300);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.hamburger}`)
      ) {
        closeMobileMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <>
      <button
        className={`${styles.hamburger} ${
          isMobileMenuOpen ? styles.hamburgerHidden : ""
        }`}
        onClick={toggleMobileMenu}
      >
        <img src="/images/burger-menu.svg" alt="Menu" />
      </button>

      {isMobileMenuOpen && (
        <div
          className={`${styles.mobileMenuBackdrop} ${
            isMobileMenuClosing ? styles.mobileMenuBackdropClosing : ""
          }`}
        >
          <nav
            ref={mobileMenuRef}
            className={`${styles.mobileMenu} ${
              isMobileMenuClosing ? styles.mobileMenuClosing : ""
            }`}
          >
            <img
              src="/images/Torino1.svg"
              alt="Torino Logo"
              className={styles.mobileMenuLogo}
            />
            <Link
              href={"/"}
              className={pathname === "/" ? styles.activeMobileLink : ""}
              onClick={closeMobileMenu}
            >
              <span>صفحه اصلی</span>
              <img src="/images/home-2.svg" alt="صفحه اصلی" />
            </Link>
            <Link
              href={"/services"}
              className={
                pathname === "/services" ? styles.activeMobileLink : ""
              }
              onClick={closeMobileMenu}
            >
              <span>خدمات گردشگری</span>
              <img src="/images/airplane-square.svg" alt="خدمات گردشگری" />
            </Link>
            <Link
              href={"/about-us"}
              className={
                pathname === "/about-us" ? styles.activeMobileLink : ""
              }
              onClick={closeMobileMenu}
            >
              <span>درباره ما</span>
              <img src="/images/volume-low.svg" alt="درباره ما" />
            </Link>
            <Link
              href={"/contact-us"}
              className={
                pathname === "/contact-us" ? styles.activeMobileLink : ""
              }
              onClick={closeMobileMenu}
            >
              <span>تماس با ما</span>
              <img src="/images/call-menu.svg" alt="تماس با ما" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
