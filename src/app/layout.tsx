import type { Metadata, Viewport } from "next";
import { Archivo, Chivo } from "next/font/google";
import { COPY } from "./copy";
import "./globals.css";

/* Chivo carries every value: a sturdy, slightly squared grotesque that
   descends from industrial and signage lettering, with tabular figures so a
   changing count never shifts width. Archivo carries labels, at one constant
   size, so no label outranks another. */
const chivo = Chivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-chivo",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: COPY.wordmark,
  description: COPY.metadataDescription,
};

export const viewport: Viewport = {
  themeColor: "#f2efe4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${chivo.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
