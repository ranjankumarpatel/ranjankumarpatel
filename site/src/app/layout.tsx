import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ranjan Kumar Patel",
  description:
    "VP, Technology at Think Talent. I lead the development, DevOps and QA teams and build full stack solutions across frontend, backend, AI, AWS and cybersecurity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
