"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Brand from "./Brand";
import PageLoader from "./PageLoader";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
];

const SCROLL_POSITION_KEY = "jajimalli:scroll-position";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const restoredPositionRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    if (navigationEntry?.type === "reload" && savedPosition !== null) {
      restoredPositionRef.current = Number(savedPosition);
    }

    const saveScrollPosition = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, String(window.scrollY));
    };

    window.addEventListener("pagehide", saveScrollPosition);
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("pagehide", saveScrollPosition);
      window.removeEventListener("beforeunload", saveScrollPosition);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const restoreScrollPosition = () => {
      const savedPosition = restoredPositionRef.current;

      if (!Number.isFinite(savedPosition)) return;

      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(savedPosition, { immediate: true, force: true });
        } else {
          window.scrollTo(0, savedPosition);
        }

        restoredPositionRef.current = null;
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      });
    };

    window.addEventListener("jajimalli:loader-ready-to-exit", restoreScrollPosition);

    return () => {
      window.removeEventListener("jajimalli:loader-ready-to-exit", restoreScrollPosition);
    };
  }, [lenis]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let animationFrame = null;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - previousScrollY;

      setShowScrollTop(currentScrollY > 400);

      if (isOpen || currentScrollY <= 0) {
        setIsHeaderHidden(false);
      } else if (scrollDifference > 0) {
        setIsHeaderHidden(true);
      } else if (scrollDifference < -6) {
        setIsHeaderHidden(false);
      }

      previousScrollY = currentScrollY;
      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageLoader />

      <header className={`${styles.header}${isHeaderHidden ? ` ${styles.headerHidden}` : ""}`}>
        <div className={styles.brandLockup}>
          <Brand />
        </div>
        <button
          className={styles.menuTrigger}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          tabIndex={isOpen ? -1 : 0}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>

        <button
          className={`${styles.scrollTopButton}${showScrollTop ? ` ${styles.scrollTopVisible}` : ""}`}
          type="button"
          aria-label="Scroll to top"
          aria-hidden={!showScrollTop}
          tabIndex={showScrollTop ? 0 : -1}
          onClick={scrollToTop}
        >
          <svg viewBox="0 0 34 34" aria-hidden="true">
            <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
          </svg>
        </button>
      </header>

      <div className={`${styles.menuOverlay}${isOpen ? ` ${styles.open}` : ""}`} aria-hidden={!isOpen}>
        <button className={styles.menuBackdrop} type="button" aria-label="Close menu" onClick={() => setIsOpen(false)} />
        <aside className={styles.menuPanel} id="site-menu">
          <button className={styles.menuClose} type="button" aria-label="Close menu" onClick={() => setIsOpen(false)}>
            <span aria-hidden="true" />
          </button>
          <nav aria-label="Main navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
