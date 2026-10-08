"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founder from "../images/aboutpage/founder.png";
import styles from "./FounderSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const imageFrame = section.querySelector("[data-founder-image-frame]");
    const image = section.querySelector("[data-founder-image]");
    const copyElements = section.querySelectorAll("[data-founder-copy]");

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 12%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          imageFrame,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut" },
          0,
        )
        .fromTo(
          image,
          { scale: 1.1, yPercent: 5 },
          { scale: 1, yPercent: 0, duration: 1, ease: "power2.out" },
          0,
        )
        .fromTo(
          copyElements,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power2.out" },
          0.15,
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="founder-title">
      <div className={styles.founderinner}>
        <div className={styles.copy}>
          <h2 id="founder-title" data-founder-copy>
            A Vision For<br />Healthier, Happier Skin
          </h2>
          <span className={styles.rule} data-founder-copy aria-hidden="true" />
          <p data-founder-copy>
            Jajimalli was founded by Dr. Mallina Krishna Rao, a distinguished dermatologist with MBBS and MD (DVL)
            qualifications, with a vision to create a space where science, care, beauty, and wellness come together.
            With extensive experience in dermatology, Dr. Rao is committed to helping individuals achieve healthier,
            radiant skin through expert guidance, advanced treatments, and a personalised approach. From everyday skin
            concerns to specialised dermatological care, Jajimalli is built around thoughtful treatment, modern
            technology, and an unwavering focus on every individual&apos;s comfort and confidence.
          </p>
        </div>

        <figure className={styles.portrait}>
          <div className={styles.imageFrame} data-founder-image-frame>
            <Image
              className={styles.image}
              data-founder-image
              src={founder}
              alt="Dr. Mallina Krishna Rao, founder of Jajimalli"
              fill
              sizes="(max-width: 800px) calc(100vw - 40px), 42vw"
            />
          </div>
          <figcaption className={styles.caption} data-founder-copy>
            <strong>Dr. Mallina Krishna Rao</strong>
            <span>Founder &amp; Dermatologist · MBBS, MD (DVL)</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
