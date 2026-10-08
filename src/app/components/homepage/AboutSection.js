"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import academy from "../../images/homepage/aboutsection/relax1.png";
import skinLaser from "../../images/homepage/aboutsection/interior.png";
import spaSalon from "../../images/homepage/aboutsection/hair.png";
import nail from "../../images/homepage/aboutsection/nailservice.png";
import styles from "./AboutSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const imagePairs = [
  [
    { src: skinLaser, alt: "Personal skin and beauty treatment", position: styles.cardOne },
    { src: academy, alt: "Jajimalli beauty academy experience", position: styles.cardTwo },
  ],
  [
    { src: nail, alt: "Jajimalli client after her salon visit", position: styles.cardThree },
    { src: spaSalon, alt: "Jajimalli salon experience", position: styles.cardFour },
  ],
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const pairs = gsap.utils.toArray("[data-about-pair]", section);
    const heading = section.querySelector("[data-about-heading]");
    const bodyCopy = section.querySelector("[data-about-body]");
    const glass = section.querySelector("[data-about-glass]");
    const adaptiveText = [heading, bodyCopy].filter(Boolean);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(glass, { autoAlpha: 0 });

      timeline.to(
        glass,
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power1.out",
        },
        0.25,
      );

      timeline.to(
        adaptiveText,
        {
          color: "#fff",
          duration: 0.3,
          ease: "power1.out",
        },
        0.25,
      );

      pairs.forEach((pair, pairIndex) => {
        const cards = pair.querySelectorAll("[data-about-card]");
        const start = pairIndex === 0 ? 0.25 : 2.75;

        gsap.set(cards, {
          x: (index) => index === 0 ? window.innerWidth * 0.22 : window.innerWidth * -0.22,
          y: () => window.innerHeight * 1.05,
          scale: 0.94,
        });

        timeline.to(
          cards,
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.06,
            ease: "power2.out",
          },
          start,
        );

        timeline.to(
          cards,
          {
            y: () => window.innerHeight * -1.25,
            duration: 1.2,
            stagger: 0.04,
            ease: "power2.inOut",
          },
          start + 1.4,
        );

      });

      timeline.to(
        glass,
        {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power1.in",
        },
        5.1,
      );

      timeline.to(
        heading,
        {
          color: "#171713",
          duration: 0.3,
          ease: "power1.in",
        },
        5.1,
      );

      timeline.to(
        bodyCopy,
        {
          color: "#31342f",
          duration: 0.3,
          ease: "power1.in",
        },
        5.1,
      );

    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stage}>
        <div className={styles.sectionGlass} data-about-glass aria-hidden="true" />

        {imagePairs.map((pair, pairIndex) => (
          <div className={styles.pair} data-about-pair key={`pair-${pairIndex}`}>
            {pair.map((image) => (
              <div className={`${styles.image} ${image.position}`} data-about-card key={image.alt}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="eager"
                  unoptimized
                  sizes="(max-width: 800px) 44vw, 31vw"
                />
              </div>
            ))}
          </div>
        ))}

        <div className={styles.copy} data-about-copy>
          <h2 data-about-heading>Beauty That Feels Personal</h2>
          <p data-about-body>We believe beauty is not simply about looking your best; it&apos;s about taking time for yourself and feeling confident in your own skin. Our thoughtfully designed beauty and wellness experiences bring together expert care, premium treatments, and a relaxing environment to make every visit a moment of indulgence and renewal.</p>
          <Link href="/about">Explore More</Link>
        </div>
      </div>
    </section>
  );
}
