import Image from "next/image";
import Link from "next/link";
import logo from "../../images/header/logo.png";
import styles from "./Brand.module.css";

export default function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Jajimalli home">
      <Image src={logo} alt="Jajimalli" priority />
    </Link>
  );
}
