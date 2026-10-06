import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import heroBackground from "../../images/homepage/cta/hero-background.png";
import heroWoman from "../../images/homepage/cta/hero-woman.png";
import styles from "./HeroSection.module.css";

const dmSansLight = DM_Sans({
  subsets: ["latin"],
  weight: "300",
});

const services = [
  {
    number: "01",
    title: "Spa Salon",
    description: "Restorative spa rituals, signature hair care and polished salon artistry.",
    href: "/services/spa-salon",
    position: "spa",
  },
  {
    number: "02",
    title: "Skin Lasers",
    description: "Advanced skin and laser treatments thoughtfully tailored to your concerns.",
    href: "/services/skin-laser",
    position: "laser",
  },
  {
    number: "03",
    title: "Beauty Academy",
    description: "Expert-led professional training for the next generation of beauty artists.",
    href: "/services/beauty-academy",
    position: "academy",
  },
];

export default function HeroSection() {
  return (
    <section className={styles.section} aria-label="Featured services" data-menu-icon-tone="dark">
      <div className={styles.background}>
        <Image src={heroBackground} alt="" fill sizes="100vw" />
      </div>
      <div className={styles.backgroundShade} />

      <div className={`${styles.marquee} ${dmSansLight.className}`} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((group) => (
            <div className={styles.marqueeGroup} key={group}>
              <span>JAJIMALLI SPA SALON SKIN LASERS AND ACADEMY</span>
              <span>JAJIMALLI SPA SALON SKIN LASERS AND ACADEMY</span>
              <span>JAJIMALLI SPA SALON SKIN LASERS AND ACADEMY</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.woman}>
        <Image src={heroWoman} alt="Jajimalli client portrait" sizes="(max-width: 800px) 150vw, 100vw" />
      </div>

      <nav className={styles.services} aria-label="Featured services">
        {services.map((service) => (
          <Link
            className={`${styles.serviceLink} ${styles[service.position]}`}
            href={service.href}
            key={service.number}
            aria-label={`${service.number} ${service.title}: ${service.description}`}
          >
            <span className={styles.marker} aria-hidden="true"><span>{service.number}</span></span>
            <span className={styles.serviceInfo}>
              <span className={styles.serviceTitle}>{service.title}</span>
              <span className={styles.serviceDescription}>{service.description}</span>
              <span className={styles.serviceCta}>Explore services <span aria-hidden="true">↗</span></span>
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
