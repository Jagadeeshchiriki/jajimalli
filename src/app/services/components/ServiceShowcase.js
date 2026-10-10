"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from "./ServiceShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceShowcase({ category, offerings }) {
  const sectionRef = useRef(null);
  const textStageRef = useRef(null);
  const visualStageRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textStage = textStageRef.current;
    const visualStage = visualStageRef.current;

    if (!section || !textStage || !visualStage || offerings.length === 0) return;

    const textItems = gsap.utils.toArray("[data-service-copy]", textStage);
    const cards = gsap.utils.toArray("[data-service-card]", visualStage);

    const context = gsap.context(() => {
      textItems.forEach((item, index) => {
        gsap.set(item, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 42,
          filter: index === 0 ? "blur(0px)" : "blur(8px)",
        });
      });

      cards.forEach((card, index) => {
        const incoming = index === 1;

        gsap.set(card, {
          autoAlpha: index === 0 ? 1 : incoming ? 0.68 : 0,
          yPercent: index === 0 ? 0 : incoming ? 10 : 16,
          z: index === 0 ? 0 : incoming ? -90 : -160,
          scale: index === 0 ? 1 : incoming ? 0.9 : 0.84,
          rotationX: index === 0 ? 0 : 5,
          filter: index === 0
            ? "blur(0px) brightness(1)"
            : incoming
              ? "blur(6px) brightness(0.82)"
              : "blur(12px) brightness(0.72)",
          zIndex: offerings.length - index,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      });

      if (offerings.length < 2) return;

      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, offerings.length) * window.innerHeight}`,
          pin: true,
          scrub: 1.15,
          snap: {
            snapTo: 1 / (offerings.length - 1),
            duration: { min: 0.25, max: 0.65 },
            delay: 0.12,
            ease: "power2.inOut",
            directional: false,
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 0; index < offerings.length - 1; index += 1) {
        const position = index;
        const currentCard = cards[index];
        const nextCard = cards[index + 1];
        const oldCard = cards[index - 1];
        const queuedCard = cards[index + 2];

        if (oldCard) {
          timeline.to(oldCard, {
            autoAlpha: 0,
            yPercent: -14,
            z: -220,
            scale: 0.76,
            filter: "blur(16px) brightness(0.62)",
          }, position);
        }

        timeline
          .to(currentCard, {
            autoAlpha: 0.34,
            yPercent: -7,
            z: -120,
            scale: 0.84,
            rotationX: -4,
            filter: "blur(10px) brightness(0.7)",
          }, position)
          .to(nextCard, {
            autoAlpha: 1,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px) brightness(1)",
          }, position)
          .set(nextCard, { zIndex: offerings.length + index + 2 }, position + 0.48)
          .to(textItems[index], {
            autoAlpha: 0,
            y: -34,
            filter: "blur(8px)",
            duration: 0.72,
          }, position)
          .to(textItems[index + 1], {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.78,
          }, position + 0.22);

        if (queuedCard) {
          timeline.to(queuedCard, {
            autoAlpha: 0.68,
            yPercent: 10,
            z: -90,
            scale: 0.9,
            rotationX: 5,
            filter: "blur(6px) brightness(0.82)",
          }, position);
        }
      }
    }, section);

    return () => context.revert();
  }, [offerings]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label={`${category} service showcase`}>
      <div className={styles.viewport}>
        <div ref={textStageRef} className={styles.textStage}>
          {offerings.map((offering) => (
            <article className={styles.copy} data-service-copy key={offering.title}>
              <h2>{offering.title}</h2>
              <p>{offering.description}</p>
            </article>
          ))}
        </div>

        <div ref={visualStageRef} className={styles.visualStage} aria-hidden="true">
          {offerings.map((offering) => (
            <figure className={styles.card} data-service-card key={offering.title}>
              <Image className={styles.image} src={offering.image} alt="" fill sizes="(max-width: 768px) 94vw, 58vw" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
