"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import academy from "../../images/homepage/servicesection/academy2.png";
import skinLaser from "../../images/homepage/servicesection/skinlaser.png";
import spaSalon from "../../images/homepage/servicesection/salon.png";
import styles from "./ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Spa Salon",
    href: "/services/spa-salon",
    image: spaSalon,
  },
  {
    title: "Skin Lasers",
    href: "/services/skin-laser",
    image: skinLaser,
  },
  {
    title: "Beauty Academy",
    href: "/services/beauty-academy",
    image: academy,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;

    if (!section || !scene) return;

    const cards = Array.from(scene.querySelectorAll("[data-three-d-card]"));
    if (cards.length !== 3) return;

    const createSlots = () => {
      const width = section.clientWidth;
      const height = window.innerHeight;
      const mobile = width <= 700;
      const horizontalDistance = mobile
        ? width * 0.255
        : Math.min(width * 0.28, 470);
      const verticalDistance = height * (mobile ? 0.21 : 0.19);

      return {
        top: {
          x: 0,
          y: -verticalDistance,
          z: 110,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          filter: "brightness(1) saturate(1)",
          boxShadow: "0 34px 90px rgba(24, 35, 30, 0.26)",
        },
        left: {
          x: -horizontalDistance,
          y: verticalDistance,
          z: -90,
          scale: mobile ? 0.9 : 0.93,
          rotationX: 3,
          rotationY: 8,
          rotationZ: -2,
          filter: "brightness(1) saturate(1)",
          boxShadow: "0 18px 48px rgba(24, 35, 30, 0.16)",
        },
        right: {
          x: horizontalDistance,
          y: verticalDistance,
          z: -90,
          scale: mobile ? 0.9 : 0.93,
          rotationX: 3,
          rotationY: -8,
          rotationZ: 2,
          filter: "brightness(1) saturate(1)",
          boxShadow: "0 18px 48px rgba(24, 35, 30, 0.16)",
        },
      };
    };

    const slotProperties = (slotName) => ({
      x: () => createSlots()[slotName].x,
      y: () => createSlots()[slotName].y,
      z: () => createSlots()[slotName].z,
      scale: () => createSlots()[slotName].scale,
      rotationX: () => createSlots()[slotName].rotationX,
      rotationY: () => createSlots()[slotName].rotationY,
      rotationZ: () => createSlots()[slotName].rotationZ,
      filter: () => createSlots()[slotName].filter,
      boxShadow: () => createSlots()[slotName].boxShadow,
    });

    const setInitialState = () => {
      const slots = createSlots();
      const initialSlots = [slots.top, slots.right, slots.left];

      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          ...initialSlots[index],
          force3D: true,
        });
      });
    };

    setInitialState();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cards[0], slotProperties("left"), 0)
        .to(cards[1], slotProperties("top"), 0)
        .to(cards[2], slotProperties("right"), 0)
        .to(cards[0], slotProperties("right"), 1)
        .to(cards[1], slotProperties("left"), 1)
        .to(cards[2], slotProperties("top"), 1);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="services-section-title">
      <div className={styles.intro}>
        {/* <span>Our Services</span> */}
        <h2 id="services-section-title">
          <span className={styles.headingLine}>Care in every</span>
          <span className={styles.headingLine}>dimension</span>
        </h2>
      </div>

      <div ref={sceneRef} className={styles.scene}>
        {services.map((service, index) => (
          <Link
            className={`${styles.card} ${styles[`card${index + 1}`]}`}
            data-three-d-card
            href={service.href}
            key={service.title}
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(max-width: 700px) 52vw, 21vw"
              className={styles.image}
            />
            <div className={styles.copy}>
              <h3>{service.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
