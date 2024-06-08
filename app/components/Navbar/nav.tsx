import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleUserButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <header className="px-4 sticky top-0 z-40 flex w-full items-center justify-between border-b border-gray-300 bg-white py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="md:text-base text-md font-semibold mr-2">
              Tanyakan App
            </Link>
          </div>
        </div>
        <button
          className={`cursor-pointer text-sm font-medium hover:underline text-gray-600 flex gap-x-2 items-center ${
            user ? "" : "hidden"
          }`}
          onClick={handleUserButtonClick}
        >
          {user ? (
            <div className="flex items-center gap-x-2 md:gap-x-3">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] rounded-full"
              />
            </div>
          ) : (
            <p></p>
          )}
        </button>
        <a
          href="/login"
          className={`cursor-pointer ml-2 text-sm font-medium hover:underline ${
            user ? "hidden" : ""
          }`}
        >
          Login
        </a>
        <nav
          id="nav-menu"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute p-3 bg-white shadow border rounded-md max-w-[250px] w-fit right-4 top-full ${
            user ? "" : "hidden"
          }`}
        >
          <ul className="block">
            <li className="group">
              <div>
                {user ? (
                  <div className="flex gap-x-2 items-center mb-4">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    <p className="md:text-base text-sm text-gray-500">
                      {user.displayName}
                    </p>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              <hr className="mb-4" />
              <a
                onClick={handleLogout}
                className="cursor-pointer text-sm font-medium hover:underline text-gray-600 flex gap-x-2 items-center"
              >
                Sign out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#A52A2A"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
