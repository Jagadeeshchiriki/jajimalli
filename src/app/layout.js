import "./globals.css";
import { Footer, Header } from "./components/SiteChrome";

export const metadata = {
  title: { default: "Jajimalli — Floral Studio", template: "%s — Jajimalli" },
  description: "Season-led florals, artfully arranged for weddings, gatherings, and everyday moments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
