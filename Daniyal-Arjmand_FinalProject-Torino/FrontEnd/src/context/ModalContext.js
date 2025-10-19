"use client";

import React, { createContext, useContext, useState } from "react";
import LoginPage from "@/components/auth/LoginPage";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [redirectPath, setRedirectPath] = useState("/");

  const openModal = (path = "/") => {
    setRedirectPath(path);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const value = { isModalOpen, openModal, closeModal, redirectPath };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {isModalOpen && <LoginPage onClose={closeModal} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
