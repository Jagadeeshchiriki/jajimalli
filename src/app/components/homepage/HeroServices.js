"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroServices({ services }) {
  const [activeService, setActiveService] = useState(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const closeCard = (event) => {
      if (window.innerWidth <= 800 && !servicesRef.current?.contains(event.target)) {
        setActiveService(null);
      }
    };

    document.addEventListener("pointerdown", closeCard);
    return () => document.removeEventListener("pointerdown", closeCard);
  }, []);

  const handleClick = (event, serviceNumber) => {
    if (window.innerWidth <= 800 && activeService !== serviceNumber) {
      event.preventDefault();
      setActiveService(serviceNumber);
    }
  };

  return (
    <nav ref={servicesRef} className={styles.services} aria-label="Featured services">
      {services.map((service) => (
        <Link
          className={`${styles.serviceLink} ${styles[service.position]}${activeService === service.number ? ` ${styles.serviceOpen}` : ""}`}
          href={service.href}
          key={service.number}
          aria-label={`${service.number} ${service.title}: ${service.description}`}
          onClick={(event) => handleClick(event, service.number)}
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
  );
}
