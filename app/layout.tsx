"use client";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Tanyakan App</title>
      </head>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
