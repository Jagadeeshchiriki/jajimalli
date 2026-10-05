"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import visakhapatnam from "../images/aboutpage/location1.png";
import tanuku from "../images/aboutpage/location2.png";
import styles from "./AboutLocations.module.css";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Visakhapatnam",
    image: visakhapatnam,
    alt: "Aerial view of the Visakhapatnam coastline",
    href: "https://www.google.com/maps/search/?api=1&query=Jajimalli+Seethammadhara+Visakhapatnam",
  },
  {
    name: "Tanuku",
    image: tanuku,
    alt: "Aerial view of Tanuku",
    href: "https://www.google.com/maps/search/?api=1&query=Jajimalli+Tanuku",
  },
];

export default function AboutLocations() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray("[data-location-card]", section);
    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        { clipPath: "inset(0 0 100% 0)", y: 34 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.15,
          stagger: 0.16,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="about-locations-title">
      <header className={styles.header}>
        <h2 id="about-locations-title">Two Locations, The Same Care</h2>
        <p>Visit us at our two beautiful locations in Visakhapatnam and Tanuku.</p>
      </header>

      <div className={styles.locations}>
        {locations.map((location) => (
          <article className={styles.location} data-location-card key={location.name}>
            <Image
              src={location.image}
              alt={location.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <div className={styles.shade} aria-hidden="true" />
            <h3>{location.name}</h3>
            <a href={location.href} target="_blank" rel="noreferrer">
              View location <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
