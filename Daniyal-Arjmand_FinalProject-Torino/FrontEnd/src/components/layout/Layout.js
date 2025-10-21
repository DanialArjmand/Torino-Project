"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { usePathname } from "next/navigation";

import styles from "@/components/layout/Layout.module.css";

function Layout({ children }) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const { openModal } = useModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);
  const mobileMenuRef = useRef(null);

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300);
    }
  };

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
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.buttons}>
          {loading ? null : user ? (
            <div ref={menuRef} className={styles.userMenuContainer}>
              <div className={styles.userInfo} onClick={toggleMenu}>
                <img
                  src="/images/arrow-down.svg"
                  alt="menu"
                  className={`${styles.arrowIcon} ${
                    isMenuOpen ? styles.arrowUp : ""
                  }`}
                />
                <span>{user.mobile}</span>
                <img src="/images/frame.svg" alt="user" />
              </div>

              {isMenuOpen && (
                <ul
                  className={`${styles.dropdownMenu} ${
                    isClosing ? styles.dropdownMenuClosing : ""
                  }`}
                >
                  <li className={styles.profileLinkNumber}>
                    <span>{user.mobile}</span>
                    <div className={styles.profileIconWrapper}>
                      <img src="/images/profile-1.svg" alt="profile" />
                    </div>
                  </li>
                  <li className={styles.profileLink}>
                    <Link href="/user/profile"> اطلاعات حساب کاربری</Link>
                    <img src="/images/profile.svg" alt="profile" />
                  </li>
                  <hr className={styles.lineHr} />
                  <li className={styles.logoutButtonContainer}>
                    <button onClick={logout} className={styles.logoutButton}>
                      خروج از حساب کاربری
                    </button>
                    <img src="/images/logout.svg" alt="logout" />
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button onClick={openModal} className={styles.loginButton}>
              <span className={styles.loginButtonText}>
                ورود <span>|</span> ثبت نام
              </span>
              <img
                src="/images/frame.svg"
                alt="user Icon"
                className={styles.loginIcon}
              />
            </button>
          )}
        </div>

        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          <img src="/images/burger-menu.svg" alt="Menu" />
        </button>

        <div className={styles.link}>
          <a>تماس با ما</a>
          <a>درباره ما</a>
          <a>خدمات گردشگری</a>
          <Link
            href={"/"}
            className={pathname === "/" ? styles.activeLink : ""}
          >
            صفحه اصلی
          </Link>
          <img src="/images/Torino1.svg" alt="Torino Logo" />
        </div>

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
              <Link
                href={"/"}
                className={pathname === "/" ? styles.activeLink : ""}
                onClick={closeMobileMenu}
              >
                صفحه اصلی
              </Link>
              <a onClick={closeMobileMenu}>خدمات گردشگری</a>
              <a onClick={closeMobileMenu}>درباره ما</a>
              <a onClick={closeMobileMenu}>تماس با ما</a>
            </nav>
          </div>
        )}
      </header>
      <main className={styles.container}>{children}</main>

      <hr className={styles.lineHr} />

      <footer className={styles.footer}>
        <div className={styles.license}>
          <div className={styles.supportWrapper}>
            <div className={styles.supportInfo}>
              <img
                className={styles.torinoLogo}
                src="/images/Torino1.svg"
                alt="Torino Logo"
              />
              <p>
                <span>۰۲۱-۸۵۸۴ </span>:تلفن پشتیبانی
              </p>
            </div>

            <div className={styles.logosLicense}>
              <img src="/images/aira-682b7c43.svg" alt="Logo" />
              <img src="/images/samandehi-6e2b448a.svg" alt="Logo" />
              <img src="/images/ecunion-35c3c933.svg" alt="Logo" />
              <img src="/images/passenger-rights-48368f81 1.svg" alt="Logo" />
              <img src="/images/state-airline-f45c55b2 1.svg" alt="Logo" />
            </div>
          </div>

          <div className={styles.description}>
            <div>
              <h2>خدمات مشتریان</h2>
              <a>پشتیبانی آنلاین</a>
              <a>راهنمای خرید</a>
              <a>راهنمای استرداد</a>
              <a>پرسش و پاسخ</a>
            </div>
            <div>
              <h2>تورینو </h2>
              <a> درباره ما</a>
              <a> تماس با ما</a>
              <a> چرا تورینو</a>
              <a>بیمه مسافرتی </a>
            </div>
          </div>
        </div>
        <p className={styles.websiteRights}>
          .کلیه حقوق این وب سایت متعلق به تورینو میباشد
        </p>
      </footer>
    </>
  );
}

export default Layout;
