"use client";

import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mapImage from "../images/servicepage/locations-map.png";
import tanukuImage from "../images/servicepage/skinlaser.png";
import vizagImage from "../images/servicepage/spasalon.png";
import styles from "./LocationsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    key: "vizag",
    name: "Visakhapatnam",
    position: { lat: 17.6868, lng: 83.2185 },
    image: vizagImage,
    imageAlt: "Jajimalli beauty and salon experience in Visakhapatnam",
  },
  {
    key: "tanuku",
    name: "Tanuku",
    position: { lat: 16.7544, lng: 81.6812 },
    image: tanukuImage,
    imageAlt: "Jajimalli skin and beauty experience in Tanuku",
  },
];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function LocationPin({ location }) {
  return (
    <div className={`${styles.location} ${styles[location.key]}`} data-location={location.key}>
      <span className={styles.pulse} aria-hidden="true" />
      <svg className={styles.pin} viewBox="0 0 32 42" aria-hidden="true">
        <path d="M16 1.5C8.4 1.5 2.2 7.7 2.2 15.3 2.2 26 16 40.5 16 40.5S29.8 26 29.8 15.3C29.8 7.7 23.6 1.5 16 1.5Z" />
        <circle cx="16" cy="15" r="5" />
      </svg>
      <strong>{location.name}</strong>
    </div>
  );
}

export default function LocationsSection({ displayFontClass }) {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const mapCanvasRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapInitializationRef = useRef(false);
  const projectionOverlayRef = useRef(null);
  const cameraRef = useRef({ lat: 17.3, lng: 82.45, zoom: 9.2 });
  const introRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const initializeMap = useCallback(async () => {
    if (
      !googleMapsApiKey
      || !mapCanvasRef.current
      || !window.google?.maps?.importLibrary
      || mapInstanceRef.current
      || mapInitializationRef.current
    ) return;

    mapInitializationRef.current = true;

    let Map;

    try {
      ({ Map } = await window.google.maps.importLibrary("maps"));
    } catch {
      mapInitializationRef.current = false;
      return;
    }

    if (!mapCanvasRef.current || mapInstanceRef.current) {
      mapInitializationRef.current = false;
      return;
    }

    const map = new Map(mapCanvasRef.current, {
      center: { lat: cameraRef.current.lat, lng: cameraRef.current.lng },
      zoom: cameraRef.current.zoom,
      mapTypeId: "satellite",
      backgroundColor: "#d9ccb4",
      clickableIcons: false,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      draggable: false,
      fullscreenControl: false,
      gestureHandling: "none",
      keyboardShortcuts: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      scrollwheel: false,
      streetViewControl: false,
      zoomControl: false,
    });

    class LocationProjectionOverlay extends window.google.maps.OverlayView {
      onAdd() {}

      draw() {
        const projection = this.getProjection();
        const section = sectionRef.current;

        if (!projection || !section) return;

        locations.forEach((location) => {
          const marker = section.querySelector(`[data-location="${location.key}"]`);
          const point = projection.fromLatLngToDivPixel(
            new window.google.maps.LatLng(location.position.lat, location.position.lng),
          );

          if (!marker || !point) return;

          marker.style.left = `${point.x}px`;
          marker.style.top = `${point.y}px`;
        });
      }

      onRemove() {}
    }

    const projectionOverlay = new LocationProjectionOverlay();
    projectionOverlay.setMap(map);
    projectionOverlayRef.current = projectionOverlay;
    mapInstanceRef.current = map;
    mapInitializationRef.current = false;
    setMapReady(true);
  }, []);

  useEffect(() => () => {
    projectionOverlayRef.current?.setMap(null);
    projectionOverlayRef.current = null;
    mapInstanceRef.current = null;
    mapInitializationRef.current = false;
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;

    if (!section || !map) return;

    const context = gsap.context(() => {
      const vizagPin = section.querySelector('[data-location="vizag"]');
      const tanukuPin = section.querySelector('[data-location="tanuku"]');
      const vizagImageCard = section.querySelector('[data-card-image="vizag"]');
      const tanukuImageCard = section.querySelector('[data-card-image="tanuku"]');
      const vizagName = section.querySelector('[data-card-name="vizag"]');
      const tanukuName = section.querySelector('[data-card-name="tanuku"]');
      const vizagCounter = section.querySelector('[data-location-counter="vizag"]');
      const tanukuCounter = section.querySelector('[data-location-counter="tanuku"]');
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([vizagPin, tanukuPin, cardRef.current, vizagImageCard, vizagName], { autoAlpha: 1 });
        return;
      }

      const mobile = window.matchMedia("(max-width: 800px)").matches;
      const camera = cameraRef.current;
      const introCamera = { lat: 17.3, lng: 82.45, zoom: mobile ? 8.35 : 9.2 };
      const vizagCamera = { lat: 17.25, lng: 82.75, zoom: mobile ? 6.85 : 7.35 };
      const tanukuCamera = { lat: 17.05, lng: 82.15, zoom: mobile ? 6.72 : 7.08 };
      const updateMapCamera = () => {
        mapInstanceRef.current?.moveCamera({
          center: { lat: camera.lat, lng: camera.lng },
          zoom: camera.zoom,
        });
      };

      Object.assign(camera, introCamera);
      updateMapCamera();
      gsap.set([vizagPin, tanukuPin], { autoAlpha: 0, scale: 0.32 });
      gsap.set(cardRef.current, { autoAlpha: 0, yPercent: 115 });
      gsap.set([vizagImageCard, vizagName], { autoAlpha: 1 });
      gsap.set([tanukuImageCard, tanukuName], { autoAlpha: 0, yPercent: 100 });
      gsap.set(vizagCounter, { autoAlpha: 1, yPercent: 0 });
      gsap.set(tanukuCounter, { autoAlpha: 0, yPercent: 100 });
      gsap.set(progressRef.current, { scaleX: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(camera, {
          lat: 17.22,
          lng: 82.5,
          zoom: mobile ? 8.15 : 8.9,
          duration: 0.55,
          onUpdate: updateMapCamera,
        }, 0)
        .to(introRef.current, { autoAlpha: 0, duration: 0.48, ease: "power2.out" }, 0.05)
        .to(camera, { ...vizagCamera, duration: 1.05, onUpdate: updateMapCamera }, 0.42)
        .to([vizagPin, tanukuPin], {
          autoAlpha: 0.42,
          scale: mobile ? 0.64 : 0.76,
          duration: 0.36,
          ease: "power2.out",
        }, 1.12)
        .to(cardRef.current, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.68,
          ease: "power3.out",
        }, 1.32)
        .to(progressRef.current, { scaleX: 0.5, duration: 0.52, ease: "none" }, 1.48)
        .to(vizagPin, {
          autoAlpha: 1,
          scale: mobile ? 0.72 : 0.9,
          duration: 0.34,
          ease: "back.out(1.5)",
        }, 2.02)
        .to(tanukuPin, { autoAlpha: 0.28, duration: 0.28 }, 2.02)
        .to(vizagImageCard, { autoAlpha: 0, yPercent: -100, duration: 0.54 }, 2.74)
        .to(vizagName, { autoAlpha: 0, yPercent: -100, duration: 0.45 }, 2.74)
        .to(tanukuImageCard, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.56,
          ease: "power3.out",
        }, 2.78)
        .to(tanukuName, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.48,
          ease: "power3.out",
        }, 2.82)
        .to(camera, { ...tanukuCamera, duration: 0.9, onUpdate: updateMapCamera }, 2.7)
        .to(vizagCounter, { autoAlpha: 0, yPercent: -100, duration: 0.3 }, 2.76)
        .to(tanukuCounter, { autoAlpha: 1, yPercent: 0, duration: 0.34 }, 2.82)
        .to(progressRef.current, { scaleX: 1, duration: 0.58, ease: "none" }, 2.78)
        .to(vizagPin, { autoAlpha: 0.28, scale: mobile ? 0.64 : 0.76, duration: 0.3 }, 3.45)
        .to(tanukuPin, {
          autoAlpha: 1,
          scale: mobile ? 0.72 : 0.94,
          duration: 0.36,
          ease: "back.out(1.5)",
        }, 3.45)
        .to(cardRef.current, {
          autoAlpha: 0,
          yPercent: -115,
          duration: 0.72,
          ease: "power3.in",
        }, 4.18)
        .to([vizagPin, tanukuPin], { autoAlpha: 0, duration: 0.4 }, 4.42);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="locations-title">
      <div className={styles.sticky}>
        <div ref={mapRef} className={styles.map}>
          <Image
            className={`${styles.mapImage} ${mapReady ? styles.mapImageHidden : ""}`}
            src={mapImage}
            alt="Map showing Jajimalli locations in Visakhapatnam and Tanuku"
            fill
            sizes="100vw"
          />
          <div
            ref={mapCanvasRef}
            className={`${styles.googleMap} ${mapReady ? styles.googleMapReady : ""}`}
            aria-hidden="true"
          />
          <div className={styles.mapWash} aria-hidden="true" />
          {locations.map((location) => <LocationPin location={location} key={location.key} />)}
        </div>

        <div ref={introRef} className={styles.intro}>
          <h2 id="locations-title">
            <span>Our</span>
            <strong className={displayFontClass}>locations</strong>
          </h2>
        </div>

        <aside ref={cardRef} className={styles.locationCard} aria-label="Jajimalli locations">
          <div className={styles.cardTop}>
            <span>Our locations</span>
            <span className={styles.cardCounter}>
              <span data-location-counter="vizag">01 — 02</span>
              <span data-location-counter="tanuku">02 — 02</span>
            </span>
          </div>

          <div className={styles.cardMedia}>
            {locations.map((location) => (
              <figure className={styles.cardImage} data-card-image={location.key} key={location.key}>
                <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 800px) 44vw, 270px" />
              </figure>
            ))}
          </div>

          <div className={styles.cardNames}>
            {locations.map((location) => (
              <p className={displayFontClass} data-card-name={location.key} key={location.key}>{location.name}</p>
            ))}
          </div>

          <div className={styles.cardLine} aria-hidden="true">
            <span className={styles.cardLineDivision} />
            <span ref={progressRef} className={styles.cardLineProgress} />
          </div>
        </aside>
      </div>

      {googleMapsApiKey ? (
        <Script
          id="jajimalli-google-maps"
          src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly&loading=async`}
          strategy="afterInteractive"
          onReady={() => void initializeMap()}
        />
      ) : null}
    </section>
  );
}
