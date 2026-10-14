import "./globals.css";
import "lenis/dist/lenis.css";
import { Aboreto, Afacad } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://jajimalli.com"),
  title: { default: "Jajimalli - Spa Salon, Skin Lasers & Academy", template: "%s | Jajimalli" },
  description: "Beauty, skin, hair and wellness experiences by Jajimalli.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  verification: {
    google: "jAZiCuSA83w0OzgHKVtkq_Uy-CRm1HPfOxQapMaaTbg",
    other: {
      "msvalidate.01": "4140B53148B8351A91C3240DBFAFF26C",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M94GSJPH');
          `}
        </Script>
      </head>
      <body className={`${aboreto.variable} ${afacad.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M94GSJPH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EVEH2T8K2J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EVEH2T8K2J');
        `}
      </Script>
    </html>
  );
}
