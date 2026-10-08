"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FeatureSectionSticky.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const media = mediaRef.current;

    if (!section || !track || !media) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getInitialScale = () => {
      if (window.innerWidth <= 450) return 0.7;
      if (window.innerWidth <= 800) return 0.7;
      return 0.7;
    };

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        media,
        { scale: getInitialScale, borderRadius: 30 },
        { scale: 1, borderRadius: 0, duration: 1, ease: "none" },
      );

      timeline.to(media, { scale: 1, borderRadius: 0, duration: 2, ease: "none" });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2>Your Beauty, Perfected<br />for the Moment</h2>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.sticky}>
          <div ref={mediaRef} className={styles.media}>
            <video autoPlay loop muted playsInline preload="auto" aria-hidden="true">
              <source src="/videos/bridalmakeup.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
