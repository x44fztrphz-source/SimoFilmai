import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: "SimoFilmai – Vestuvių video",
  description: "Šilti, jausmingi vestuvių filmai ir teaseriai.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}