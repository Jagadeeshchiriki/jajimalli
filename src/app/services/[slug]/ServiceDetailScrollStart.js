"use client";

import { useLayoutEffect } from "react";
import { useLenis } from "lenis/react";

export default function ServiceDetailScrollStart({ routeKey }) {
  const lenis = useLenis();

  useLayoutEffect(() => {
    const moveToHero = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    moveToHero();
    const frame = requestAnimationFrame(moveToHero);

    return () => cancelAnimationFrame(frame);
  }, [lenis, routeKey]);

  return null;
}
