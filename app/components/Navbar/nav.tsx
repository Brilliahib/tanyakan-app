"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, googleSignIn, signOut } = useAuth();

  const handleLogout = () => {
    signOut(); // Panggil fungsi logout dari context AuthContext
  };

  return (
    <>
      <header className="px-4 sticky top-0 z-40 flex w-full items-center justify-between border-b border-gray-300 bg-white py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="text-sm font-medium mr-2">
              Tanyakan
            </Link>
          </div>
          <div className="flex items-center">
            <p>/</p>
            {user ? (
              <a
                className="cursor-pointer ml-2 text-sm font-medium hover:underline dark:text-zinc-200"
                onClick={handleLogout}
              >
                Logout
              </a>
            ) : (
              <a
                href="/login"
                className="cursor-pointer ml-2 text-sm font-medium hover:underline dark:text-zinc-200"
              >
                Login
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {user ? (
            <p className="ml-2 text-sm font-medium">
              Hello, {user.displayName}!
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </header>
    </>
  );
}
