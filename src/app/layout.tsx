import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axiom Trade - Token Discovery",
  description: "Real-time token trading data with live updates",
  keywords: ["crypto", "tokens", "trading", "defi", "web3"],
  authors: [{ name: "Axiom Trade" }],
  openGraph: {
    title: "Axiom Trade - Token Discovery",
    description: "Real-time token trading data with live updates",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
