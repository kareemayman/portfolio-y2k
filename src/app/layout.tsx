import type { Metadata } from "next";
import { Pixelify_Sans, Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { Atmosphere } from "@/components/Atmosphere";
import { Taskbar } from "@/components/y2k";

const NAV = [
  { label: "about_me.txt", href: "#about" },
  { label: "projects/", href: "#work" },
  { label: "contact.exe", href: "#contact" },
];

// Display — soft pixel face for hero, section titles, big numbers.
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  display: "swap",
});

// Body — readable face with character for paragraphs / case-study copy.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Chrome — MS-Sans-style face for title bars, buttons, menus, labels.
const w95fa = localFont({
  src: "./fonts/W95FA.woff",
  variable: "--font-w95fa",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAREEM.OS — Kareem Ayman · Frontend Developer",
  description:
    "The personal operating system of Kareem Ayman — a frontend developer building responsive, high-performance interfaces with React, Next.js & TypeScript. Boot up and look around.",
  authors: [{ name: "Kareem Ayman" }],
  keywords: [
    "Kareem Ayman",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelify.variable} ${bricolage.variable} ${w95fa.variable} h-full`}
    >
      <body className="min-h-full">
        <SmoothScroll>
          <Atmosphere />
          {children}
          <Taskbar sections={NAV} />
        </SmoothScroll>
      </body>
    </html>
  );
}
