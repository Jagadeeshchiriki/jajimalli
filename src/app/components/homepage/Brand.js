import Link from "next/link";
import { Inter } from "next/font/google";
import logo from "../../images/header/logo2.png";
import styles from "./Brand.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "700",
});

export default function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Jajimalli home">
      <svg viewBox="0 0 600 400" aria-hidden="true">
        <path
          d="M8 200C9 121 63 76 134 72C207 68 224 112 287 101C358 89 387 20 451 6C518-9 540 48 535 115C531 177 520 192 550 233C586 282 610 324 582 351C550 381 498 337 436 329C365 319 323 360 263 392C211 420 156 390 135 343C114 296 64 300 32 271C11 251 5 226 8 200Z"
          fill="#f5f0e4"
          stroke="#e7d5af"
          strokeWidth="1"
        />

        <image href={logo.src} x="100" y="130" width="400" height="135" />
        <text
          className={inter.className}
          x="120"
          y="302"
          fill="#171713"
          fontSize="28"
          fontWeight="700"
          letterSpacing=".59"
          textLength="400"
          lengthAdjust="spacingAndGlyphs"
        >
          SPA SALON | SKIN LASERS | ACADEMY
        </text>
      </svg>
    </Link>
  );
}
