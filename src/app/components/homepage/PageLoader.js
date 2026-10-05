"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../../images/header/logo2.png";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const loaderRef = useRef(null);
  const logoFillRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logoFill = logoFillRef.current;
    const progressBar = progressBarRef.current;
    const progressText = progressTextRef.current;

    if (!loader || !logoFill || !progressBar || !progressText) return;

    const state = { progress: 0 };
    const startedAt = performance.now();
    const minimumVisibleTime = 900;
    let finished = false;
    let finishScheduled = false;
    let progressTween;
    let completionTween;
    let exitTween;
    let finishTimer;

    const renderProgress = () => {
      const progress = Math.min(1, Math.max(0, state.progress));

      logoFill.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
      progressBar.style.transform = `scaleX(${progress})`;
      progressText.textContent = `${Math.round(progress * 100).toString().padStart(2, "0")}%`;
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      progressTween?.kill();

      completionTween = gsap.to(state, {
        progress: 1,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: renderProgress,
        onComplete: () => {
          window.dispatchEvent(new Event("jajimalli:loader-ready-to-exit"));

          exitTween = gsap.to(loader, {
            yPercent: -100,
            duration: 0.7,
            delay: 0.1,
            ease: "power4.inOut",
            onComplete: () => {
              loader.style.display = "none";
            },
          });
        },
      });
    };

    const requestFinish = () => {
      if (finished || finishScheduled) return;
      finishScheduled = true;

      const elapsed = performance.now() - startedAt;
      finishTimer = window.setTimeout(finish, Math.max(0, minimumVisibleTime - elapsed));
    };

    const handleHeroProgress = (event) => {
      const progress = Number(event.detail?.progress) || 0;
      state.progress = Math.max(state.progress, progress);
      renderProgress();

      if (progress >= 1) requestFinish();
    };

    renderProgress();
    progressTween = gsap.to(state, {
      progress: 0.88,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: renderProgress,
    });

    window.addEventListener("jajimalli:hero-progress", handleHeroProgress);
    window.addEventListener("load", requestFinish, { once: true });

    if (document.readyState === "complete") requestFinish();

    const fallbackTimer = window.setTimeout(requestFinish, 1800);

    return () => {
      window.removeEventListener("jajimalli:hero-progress", handleHeroProgress);
      window.removeEventListener("load", requestFinish);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(finishTimer);
      progressTween?.kill();
      completionTween?.kill();
      exitTween?.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className={styles.loader}
      role="status"
      aria-label="Loading Jajimalli experience"
    >
      <div className={styles.loaderLogo}>
        <Image
          className={styles.loaderLogoBase}
          src={logo}
          alt="Jajimalli"
          priority
        />
        <div ref={logoFillRef} className={styles.loaderLogoFill}>
          <Image src={logo} alt="" priority />
        </div>
      </div>
      <div className={styles.loaderProgress}>
        <span ref={progressTextRef}>00%</span>
        <div>
          <i ref={progressBarRef} />
        </div>
      </div>
    </div>
  );
}
