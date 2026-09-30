import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "./components/SmoothScroll";

export const metadata = {
  title: { default: "Jajimalli — Spa, Salon & Academy", template: "%s — Jajimalli" },
  description: "Beauty, skin, hair and wellness experiences by Jajimalli.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
