"use client";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, googleSignIn, signOut } = useAuth();

  const handleLogout = () => {
    signOut(); // Panggil fungsi logout dari context AuthContext
  };

  return (
    <>
      <header>
        <div className="top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
          <div className="flex items-center">
            <div className="flex items-center">
              <a href="" className="text-sm font-medium mr-2">
                Tanyakan
              </a>
            </div>
            <div className="flex items-center">
              <p>/</p>
              {user ? (
                <p className="ml-2 text-sm font-medium">{user.displayName}</p>
              ) : (
                <a
                  href="/login"
                  className="ml-2 text-sm font-medium hover:underline dark:text-zinc-200"
                >
                  Login
                </a>
              )}
            </div>
            <div></div>
          </div>
          <div className="flex items-center">
            {user ? (
              <a
                className="cursor-pointer ml-2 text-sm font-medium hover:underline dark:text-zinc-200"
                onClick={handleLogout}
              >
                Logout
              </a>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
