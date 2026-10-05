import Image from "next/image";
import Link from "next/link";
import introImage from "../images/servicepage/about_intro.png";
import { services } from "./serviceData";
import styles from "./ServicesPage.module.css";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image className={styles.heroImage} src={introImage} alt="Spa essentials arranged for a calming treatment" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <h1>
            <span className={styles.heroLine}>Beauty, Wellness &amp; Expertise</span>
            <span className={styles.heroLine}>— All In One Place</span>
          </h1>
        </div>
      </section>

      <section className={styles.serviceList} aria-labelledby="service-list-title">
        <h2 className={styles.visuallyHidden} id="service-list-title">Explore our services</h2>
        {services.map((service, index) => (
          <Link
            className={styles.serviceRow}
            href={`/services/${service.slug}`}
            id={service.slug}
            key={service.slug}
          >
            <span className={styles.serviceNumber}>0{index + 1}</span>
            <span className={styles.serviceCopy}>
              <span className={styles.serviceTitle}>{service.title}</span>
              <span className={styles.serviceTagline}>{service.tagline}</span>
            </span>
            <span className={styles.preview} aria-hidden="true">
              <Image src={service.image} alt="" fill sizes="(max-width: 800px) 86vw, 44vw" />
            </span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </Link>
        ))}

      </section>
    </main>
  );
}
