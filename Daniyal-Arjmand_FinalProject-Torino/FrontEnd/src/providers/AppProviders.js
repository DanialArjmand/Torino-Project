"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider, useModal } from "@/context/ModalContext";
import LoginPage from "@/components/auth/LoginPage";

function GlobalModal() {
  const { isModalOpen, closeModal } = useModal();
  return isModalOpen ? <LoginPage onClose={closeModal} /> : null;
}

export function AppProviders({ children }) {
  return (
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
        {children}
        <GlobalModal />
      </ModalProvider>
    </AuthProvider>
  );
}
