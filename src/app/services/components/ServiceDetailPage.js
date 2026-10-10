import Image from "next/image";
import Link from "next/link";
import ServiceDetailScrollStart from "./ServiceDetailScrollStart";
import ServiceShowcase from "./ServiceShowcase";
import styles from "./ServiceDetailPage.module.css";

export default function ServiceDetailPage({ service, children, showServiceShowcase = true }) {
  return (
    <main className={styles.page}>
      <ServiceDetailScrollStart routeKey={service.slug} />

      <section className={styles.hero} data-menu-icon-tone="dark">
        <Image src={service.image} alt={`${service.shortTitle} at Jajimalli`} fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <h1>{service.shortTitle}</h1>
          <span>{service.description}</span>
        </div>
      </section>

      {showServiceShowcase && <ServiceShowcase category={service.shortTitle} offerings={service.offerings} />}
      {children}

      <div className={styles.detailFooter}>
        <Link className={styles.backLink} href="/services">View all categories</Link>
      </div>
    </main>
  );
}
