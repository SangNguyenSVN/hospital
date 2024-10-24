// src/app/layout.tsx
"use client"; // Đánh dấu file này là client component

import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push('/admin/login'); // Chuyển hướng đến trang đăng nhập nếu không có user
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className} style={{margin: 0}}>
        {children}
      </body>
    </html>
  );
}
