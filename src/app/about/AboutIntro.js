"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import exterior from "../images/aboutpage/introsection/exterior1.png";
import salonWide from "../images/aboutpage/introsection/interior1.jpg";
import stylingFloor from "../images/aboutpage/introsection/interiro2.jpg";
import treatmentRoom from "../images/aboutpage/introsection/interiro3.jpg";
import salonLounge from "../images/aboutpage/introsection/interiro4.jpg";
import interiorHero from "../images/aboutpage/interior4.png";
import styles from "./AboutIntro.module.css";

gsap.registerPlugin(ScrollTrigger);

const imagePairs = [
  [
    { src: salonWide, alt: "Jajimalli salon and spa interior", position: styles.cardOne },
    { src: treatmentRoom, alt: "Private Jajimalli treatment room", position: styles.cardTwo },
  ],
  [
    { src: stylingFloor, alt: "Jajimalli salon styling floor", position: styles.cardThree },
    { src: salonLounge, alt: "Jajimalli salon lounge", position: styles.cardFour },
  ],
];

export default function AboutIntro() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const firstHero = section.querySelector("[data-about-first-hero]");
    const secondHero = section.querySelector("[data-about-second-hero]");
    const backdrop = section.querySelector("[data-about-backdrop]");
    const heroCopy = section.querySelector("[data-about-hero-copy]");
    const storyCopy = section.querySelector("[data-about-story-copy]");
    const storyTexts = gsap.utils.toArray("[data-about-story-text]", section);
    const pairs = gsap.utils.toArray("[data-about-card-pair]", section);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    let settleStoryText;

    const context = gsap.context(() => {
      gsap.set(secondHero, { clipPath: "inset(100% 0 0 0)", scale: 1.07 });
      gsap.set(firstHero, { scale: 1 });
      gsap.set(backdrop, { backdropFilter: "blur(0px)" });
      gsap.set(storyCopy, { autoAlpha: 0 });
      gsap.set(storyTexts[0], { autoAlpha: 1, y: 0 });
      gsap.set(storyTexts[1], { autoAlpha: 0, y: 32 });

      pairs.forEach((pair) => {
        const cards = pair.querySelectorAll("[data-about-card]");

        gsap.set(cards, {
          x: (index) => index === 0 ? window.innerWidth * 0.22 : window.innerWidth * -0.22,
          y: () => window.innerHeight * 1.05,
          scale: 0.94,
        });
      });

      const storyTextStart = 3.28;
      const storyTextEnd = 3.9;
      const storyTextTimeline = gsap.timeline({ paused: true })
        .to(storyTexts[0], { autoAlpha: 0, y: -30, duration: 0.38, ease: "power2.in" }, 0)
        .to(storyTexts[1], { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" }, 0.14);
      let storyTextTween;

      const getStoryTextProgress = (trigger) => {
        const timelineTime = trigger.progress * trigger.animation.duration();
        return gsap.utils.clamp(0, 1, (timelineTime - storyTextStart) / (storyTextEnd - storyTextStart));
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          onUpdate: (trigger) => {
            storyTextTween?.kill();
            storyTextTween = gsap.to(storyTextTimeline, {
              progress: getStoryTextProgress(trigger),
              duration: 0.9,
              ease: "power1.out",
              overwrite: true,
            });
          },
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(secondHero, {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.15,
          ease: "power2.inOut",
        }, 0)
        .to(firstHero, { scale: 1.045, duration: 1.15, ease: "none" }, 0)
        .to(backdrop, {
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(8, 15, 11, .3)",
          duration: 0.72,
          ease: "power1.inOut",
        }, 1.08)
        .to(heroCopy, {
          autoAlpha: 0,
          y: -52,
          scale: 0.96,
          duration: 0.62,
          ease: "power2.in",
        }, 1.12)
        .to(storyCopy, { autoAlpha: 1, duration: 0.52, ease: "power2.out" }, 1.62);

      pairs.forEach((pair, pairIndex) => {
        const cards = pair.querySelectorAll("[data-about-card]");
        const start = pairIndex === 0 ? 1.72 : 3.62;

        timeline.to(cards, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.06,
          ease: "power2.out",
        }, start);

        timeline.to(cards, {
          y: () => window.innerHeight * -1.25,
          duration: 1.2,
          stagger: 0.04,
          ease: "power2.inOut",
        }, start + 1.16);
      });

      timeline.to(backdrop, {
          backdropFilter: "blur(24px)",
          backgroundColor: "rgba(8, 15, 11, .48)",
          duration: 0.6,
        }, 5.1);

      settleStoryText = () => {
        const trigger = timeline.scrollTrigger;

        if (!trigger?.isActive) return;

        const progress = getStoryTextProgress(trigger);

        if (progress === 0 || progress === 1) return;

        const destination = progress < 0.5 ? 0 : 1;
        storyTextTween?.kill();
        storyTextTween = gsap.to(storyTextTimeline, {
          progress: destination,
          duration: gsap.utils.interpolate(0.3, 0.65, Math.abs(destination - storyTextTimeline.progress())),
          ease: "power2.inOut",
          overwrite: true,
        });
      };

      ScrollTrigger.addEventListener("scrollEnd", settleStoryText);
    }, section);

    return () => {
      if (settleStoryText) ScrollTrigger.removeEventListener("scrollEnd", settleStoryText);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="about-intro-title" data-menu-icon-tone="dark">
      <div className={styles.stage}>
        <div className={`${styles.heroMedia} ${styles.firstHero}`} data-about-first-hero>
          <Image
            src={exterior}
            alt="Jajimalli salon exterior surrounded by greenery"
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={`${styles.heroMedia} ${styles.secondHero}`} data-about-second-hero>
          <Image
            src={interiorHero}
            alt="The warm and welcoming Jajimalli salon interior"
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.backdrop} data-about-backdrop aria-hidden="true" />

        <div className={styles.heroCopy} data-about-hero-copy>
          <h1 id="about-intro-title">Beauty, With<br />A Sense of Place</h1>
          {/* <p>A thoughtful destination for beauty, wellness and the quiet confidence that follows exceptional care.</p> */}
        </div>

        {imagePairs.map((pair, pairIndex) => (
          <div className={styles.cardPair} data-about-card-pair key={`about-pair-${pairIndex}`}>
            {pair.map((image) => (
              <figure className={`${styles.card} ${image.position}`} data-about-card key={image.alt}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 48vw, 32vw" />
              </figure>
            ))}
          </div>
        ))}

        <div className={styles.storyCopy} data-about-story-copy>
          <div className={styles.storyText} data-about-story-text>
            <h2>Where expert artistry and a calming environment make beauty feel deeply personal.</h2>
          </div>
          <div className={styles.storyText} data-about-story-text>
            <h2>Every visit is created to leave you restored, confident and completely yourself.</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
