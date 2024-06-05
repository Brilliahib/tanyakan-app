//login/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../lib/firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface LoginProps {}

interface FormState {
  email: string;
  password: string;
}

const initialFormState: FormState = {
  email: "",
  password: "",
};

const Login: React.FC<LoginProps> = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        document.cookie = `token=${user.refreshToken}; path=/`; // Set the cookie on login
        router.push("/"); // Redirect to home page after login
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-full">
          <div className="w-full flex items-center justify-center">
            <div className="h-screen flex flex-col items-center w-full justify-center px-4">
              <div className="max-w-sm text-center">
                <h1 className="font-bold text-2xl mb-4">Tanyakan App</h1>
                <p className="text-gray-500 mb-10">
                  Find solutions quickly and efficiently, saving time and
                  increasing productivity by addressing your inquiries promptly.
                </p>
              </div>
              <form
                onSubmit={handleLogin}
                className="flex flex-col justify-center items-center text-foreground w-full max-w-sm gap-3 mb-4"
              >
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full p-3 text-base font-medium text-slate-600 rounded-lg focus:outline-slate-400 placeholder:text-[#6B7280] lg:text-md bg-[#ebf2f7]"
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  className="w-full p-3 text-base font-medium text-slate-600 rounded-lg focus:outline-slate-400 placeholder:text-[#6B7280] lg:text-md bg-[#ebf2f7] dark:border-none"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-white font-medium text-center rounded-md bg-black lg:text-lg"
                >
                  Login
                </button>
              </form>
              <div className="flex flex-col justify-center items-center text-foreground w-full max-w-sm gap-3">
                <h1 className="text-gray-400">OR</h1>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-2 justify-center flex gap-x-2 items-center font-medium text-center rounded-md bg-white border text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span>Sign In with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
