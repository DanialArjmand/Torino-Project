"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { usePathname } from "next/navigation";
import styles from "@/components/layout/Layout.module.css";

import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

function Header() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const { openModal } = useModal();

  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {loading ? null : user ? (
          <UserMenu user={user} logout={logout} />
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

      <MobileMenu />

      <div className={styles.link}>
        <a>تماس با ما</a>
        <a>درباره ما</a>
        <a>خدمات گردشگری</a>
        <Link href={"/"} className={pathname === "/" ? styles.activeLink : ""}>
          صفحه اصلی
        </Link>
        <img src="/images/Torino1.svg" alt="Torino Logo" />
      </div>
    </header>
  );
}

export default Header;
