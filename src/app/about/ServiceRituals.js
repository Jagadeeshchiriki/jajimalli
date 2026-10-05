import Image from "next/image";
import Link from "next/link";
import { services } from "../services/serviceData";
import styles from "./ServiceRituals.module.css";

export default function ServiceRituals() {
  return (
    <section className={styles.section} aria-labelledby="service-rituals-title">
      <div className={styles.intro}>
        <h2 id="service-rituals-title">A Ritual For<br />Every You.</h2>
        <p>Explore the different ways you can experience Jajimalli—from restorative spa rituals and advanced skin care to considered salon artistry and professional training.</p>
      </div>

      <div className={styles.serviceList}>
        {services.map((service, index) => (
          <Link className={styles.service} href={`/services/${service.slug}`} key={service.slug}>
            <Image
              className={styles.serviceImage}
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 58vw"
            />
            <span className={styles.imageShade} aria-hidden="true" />
            <span className={styles.number}>{index + 1}</span>
            <span className={styles.title}>{service.title}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
