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
  { title: "Spa Salon", image: spaSalon, position: "center" },
  { title: "Skin Lasers", image: skinLaser, position: "center" },
  { title: "Academy", image: academy, position: "center" },
];

const carouselServices = [...services, ...services];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const carouselElement = carouselRef.current;

    if (!section || !carouselElement) return;

    const slides = Array.from(section.querySelectorAll("[data-service-slide]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let sectionReveal = prefersReducedMotion ? 1 : 0;
    let carousel;
    let revealTrigger;
    let disposed = false;

    const updateSlidePositions = () => {
      const carouselRect = carouselElement.getBoundingClientRect();

      slides.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const motion = slide.querySelector("[data-service-motion]");
        const media = slide.querySelector("[data-service-media]");
        const image = slide.querySelector("[data-service-image]");

        if (!motion || !media || !image) return;

        const offsetLeft = slideRect.left + slideRect.width - carouselRect.left;
        const progressLeft = offsetLeft / (carouselRect.width + slideRect.width);
        const offsetCenter = slideRect.left
          + slideRect.width / 2
          - carouselRect.left
          - carouselRect.width / 2;
        const progressCenter = offsetCenter / (carouselRect.width + slideRect.width);
        const imageMove = Math.min(49, Math.max(0, 49 * progressLeft));
        const sideInset = 22 * (1 - sectionReveal);

        media.style.clipPath = `inset(0 ${sideInset}% 0 ${sideInset}%)`;

        if (prefersReducedMotion) {
          motion.style.transform = "none";
          image.style.transform = "translateX(-24.5%)";
          return;
        }

        image.style.transform = `translateX(-${imageMove}%)`;
        motion.style.transform = `translateY(${60 * progressCenter}%) rotate(${6 * progressCenter}deg)`;
      });
    };

    const initialiseCarousel = async () => {
      const { default: Flickity } = await import("flickity");

      if (disposed) return;

      carousel = new Flickity(carouselElement, {
        accessibility: true,
        cellAlign: "center",
        cellSelector: "[data-service-slide]",
        contain: false,
        draggable: true,
        dragThreshold: 1,
        freeScroll: true,
        freeScrollFriction: 0.05,
        pageDots: false,
        percentPosition: true,
        prevNextButtons: false,
        resize: true,
        selectedAttraction: 0.01,
        wrapAround: true,
      });

      carousel.on("scroll", updateSlidePositions);
      carousel.on("dragMove", updateSlidePositions);
      carousel.on("settle", updateSlidePositions);

      revealTrigger = prefersReducedMotion
        ? null
        : ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: ({ progress }) => {
              sectionReveal = progress < 0.35
                ? progress / 0.35
                : progress > 0.65
                  ? (1 - progress) / 0.35
                  : 1;
              updateSlidePositions();
            },
          });

      updateSlidePositions();
    };

    initialiseCarousel();

    return () => {
      disposed = true;
      revealTrigger?.kill();

      if (carousel) {
        carousel.off("scroll", updateSlidePositions);
        carousel.off("dragMove", updateSlidePositions);
        carousel.off("settle", updateSlidePositions);
        carousel.destroy();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2>Our Services</h2>
      <div ref={carouselRef} className={styles.carousel}>
        {carouselServices.map((service, index) => (
          <Link
            href="/services"
            className={styles.tile}
            data-service-slide
            key={`${service.title}-${index}`}
          >
            <div className={styles.motion} data-service-motion>
              <div className={styles.media} data-service-media>
                <Image
                  className={styles.image}
                  data-service-image
                  src={service.image}
                  alt=""
                  loading="eager"
                  unoptimized
                  draggable={false}
                  sizes="(max-width: 767px) 160vw, (max-width: 991px) 96vw, 60vw"
                  style={{ objectPosition: service.position }}
                />
              </div>
              <span>{service.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
