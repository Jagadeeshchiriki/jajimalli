import "./globals.css";
import "lenis/dist/lenis.css";
import { Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
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
      <body className={cormorantGaramond.variable}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
