import "./globals.css";
import "lenis/dist/lenis.css";
import { Aboreto, Afacad } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aboreto",
});

const afacad = Afacad({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-afacad",
});

export const metadata = {
  title: { default: "Jajimalli — Spa, Salon & Academy", template: "%s — Jajimalli" },
  description: "Beauty, skin, hair and wellness experiences by Jajimalli.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${aboreto.variable} ${afacad.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
