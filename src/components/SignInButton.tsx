"use client";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function SignInButton({ children, className }: SignInButtonProps) {
  return (
    <button
      onClick={() => {
        signIn("google");
      }}
      className={
        className ||
        "px-4 sm:px-5 py-2 rounded text-gray-800 bg-gray-400 hover:cursor-pointer font-semibold shadow hover:bg-gray-100 transition text-sm sm:text-base"
      }
    >
      {children || "Sign In"}
    </button>
  );
}
