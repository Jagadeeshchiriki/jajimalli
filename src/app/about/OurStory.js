"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import storyImage from "../images/aboutpage/ourstory.png";
import styles from "./OurStory.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef(null);
  const revealRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;

    if (!section || !reveal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.set(reveal, { clipPath: "inset(0 100% 0 0)" });

      const revealTween = gsap.to(reveal, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.35,
        ease: "power3.inOut",
        paused: true,
      });

      ScrollTrigger.create({
        trigger: reveal,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => revealTween.restart(),
        onLeaveBack: () => {
          revealTween.pause(0);
          gsap.set(reveal, { clipPath: "inset(0 100% 0 0)" });
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="our-story-title">
      <div className={styles.inner}>
        <div className={styles.imageColumn}>
          <div ref={revealRef} className={styles.imageReveal}>
            <Image
              src={storyImage}
              alt="The welcoming lounge inside Jajimalli"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className={styles.copy}>
          <h2 id="our-story-title">Rooted in care<br />Refined through experience</h2>
          <div className={styles.body}>
            <p>Jajimalli began with a simple belief: beauty feels most meaningful when it is personal. Every space, service and detail has been shaped to help you slow down, feel understood and leave with renewed confidence.</p>
            <p>From restorative spa rituals and thoughtful salon artistry to advanced skin care and professional education, our approach brings expertise and warmth together under one roof.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
