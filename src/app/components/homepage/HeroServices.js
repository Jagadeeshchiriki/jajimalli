"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroServices({ services }) {
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const closeCard = (event) => {
      if (window.innerWidth > 800) return;
      if (event.target.closest?.(`.${styles.marker}, .${styles.serviceInfo}`)) return;
      setActiveService(null);
    };

    document.addEventListener("pointerdown", closeCard);
    return () => document.removeEventListener("pointerdown", closeCard);
  }, []);

  const handleMarkerClick = (event, serviceNumber) => {
    if (window.innerWidth > 800) return;
    event.preventDefault();
    setActiveService((currentService) => currentService === serviceNumber ? null : serviceNumber);
  };

  return (
    <nav className={styles.services} aria-label="Featured services">
      {services.map((service) => (
        <div
          className={`${styles.serviceLink} ${styles[service.position]}${activeService === service.number ? ` ${styles.serviceOpen}` : ""}`}
          key={service.number}
        >
          <Link
            className={styles.marker}
            href={service.href}
            aria-label={`${service.number} ${service.title}`}
            onClick={(event) => handleMarkerClick(event, service.number)}
          >
            <span>{service.number}</span>
          </Link>
          <Link className={styles.serviceInfo} href={service.href} aria-label={`View ${service.title} services`}>
            <span className={styles.serviceTitle}>{service.title}</span>
            <span className={styles.serviceDescription}>{service.description}</span>
            <span className={styles.serviceCta}>Explore services <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
