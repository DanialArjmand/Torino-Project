"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/components/layout/Layout.module.css";

function UserMenu({ user, logout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
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

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div ref={menuRef} className={styles.userMenuContainer}>
      <div className={styles.userInfo} onClick={toggleMenu}>
        <img
          src="/images/arrow-down.svg"
          alt="menu"
          className={`${styles.arrowIcon} ${isMenuOpen ? styles.arrowUp : ""}`}
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
  );
}

export default UserMenu;
