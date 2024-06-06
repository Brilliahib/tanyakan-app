"use client";
import { useAuth } from "@/app/context/AuthContext";

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
            <a href="/" className="text-sm font-medium mr-2">
              Tanyakan
            </a>
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
