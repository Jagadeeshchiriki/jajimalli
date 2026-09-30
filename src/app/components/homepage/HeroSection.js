"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPoster from "../../images/homepage/hereosection.png";
import logo from "../../images/header/logo.png";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "Beauty In Every Detail";
const CAPTURE_FPS = 12;
const MAX_FRAMES = 160;
const MAX_CAPTURE_WIDTH = 1280;
const JPEG_QUALITY = 0.82;
const FRAME_EASE = 0.1;
const VIDEO_END = 0.82;

function AnimatedTitle() {
  return (
    <h1 aria-label={TITLE}>
      {TITLE.split(" ").map((word, wordIndex) => (
        <span className={styles.word} aria-hidden="true" key={word}>
          {Array.from(word).map((character, characterIndex) => (
            <span className={styles.character} data-hero-character key={`${character}-${characterIndex}`}>
              {character}
            </span>
          ))}
          {wordIndex < TITLE.split(" ").length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </h1>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const posterRef = useRef(null);
  const copyRef = useRef(null);
  const cueRef = useRef(null);
  const loaderRef = useRef(null);
  const logoFillRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const poster = posterRef.current;
    const copy = copyRef.current;
    const cue = cueRef.current;
    const loader = loaderRef.current;
    const logoFill = logoFillRef.current;
    const progressBar = progressBarRef.current;
    const progressText = progressTextRef.current;
    const context2d = canvas?.getContext("2d", { alpha: false });
    if (!section || !canvas || !video || !poster || !copy || !cue || !loader || !logoFill || !progressBar || !progressText || !context2d) return undefined;

    const frames = [];
    const objectUrls = [];
    const characters = Array.from(copy.querySelectorAll("[data-hero-character]"));
    let cancelled = false;
    let ready = false;
    let frameCount = 0;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnFrame = -1;
    let targetTextProgress = 0;
    let currentTextProgress = 0;
    let animationFrameId;
    let scrollTrigger;
    let resizeTimer;
    let loaderTween;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const previousBodyOverflow = document.body.style.overflow;

    video.pause();
    document.body.style.overflow = "hidden";

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * pixelRatio);
      canvas.height = Math.round(canvas.clientHeight * pixelRatio);
      lastDrawnFrame = -1;
    };

    const drawCover = (image) => {
      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;
      let width;
      let height;
      let x;
      let y;

      if (canvasRatio > imageRatio) {
        width = canvas.width;
        height = width / imageRatio;
        x = 0;
        y = (canvas.height - height) / 2;
      } else {
        height = canvas.height;
        width = height * imageRatio;
        x = (canvas.width - width) / 2;
        y = 0;
      }

      context2d.drawImage(image, x, y, width, height);
    };

    const drawFrame = (index) => {
      if (!ready) return;
      const frameIndex = clamp(Math.round(index), 0, frameCount - 1);
      if (frameIndex === lastDrawnFrame || !frames[frameIndex]) return;
      lastDrawnFrame = frameIndex;
      drawCover(frames[frameIndex]);
    };

    const animateCharacters = (progress) => {
      const letterWindow = 0.22;
      characters.forEach((character, index) => {
        const position = index / Math.max(characters.length - 1, 1);
        const start = (1 - letterWindow) * position;
        const letterProgress = clamp((progress - start) / letterWindow);
        character.style.opacity = letterProgress;
        character.style.transform = `translate3d(0, ${24 * (1 - letterProgress)}px, 0) scale(${0.92 + 0.08 * letterProgress})`;
        character.style.filter = `blur(${5 * (1 - letterProgress)}px)`;
      });
    };

    const updateLoader = (progress) => {
      const percentage = clamp(progress);
      logoFill.style.clipPath = `inset(0 ${100 - percentage * 100}% 0 0)`;
      progressBar.style.transform = `scaleX(${percentage})`;
      progressText.textContent = `${Math.round(percentage * 100).toString().padStart(2, "0")}%`;
    };

    const finishLoader = () => {
      updateLoader(1);
      loaderTween = gsap.to(loader, {
        yPercent: -100,
        duration: 1.05,
        delay: 0.25,
        ease: "power4.inOut",
        onComplete: () => {
          loader.style.display = "none";
          document.body.style.overflow = previousBodyOverflow;
        },
      });
    };

    const seekTo = (time) => new Promise((resolve) => {
      if (Math.abs(video.currentTime - time) < 0.001) {
        resolve();
        return;
      }

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        video.removeEventListener("seeked", finish);
        resolve();
      };

      video.addEventListener("seeked", finish, { once: true });
      window.setTimeout(finish, 450);
      video.currentTime = time;
    });

    const canvasToBlob = (sourceCanvas) => new Promise((resolve, reject) => {
      sourceCanvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Unable to capture video frame"));
      }, "image/jpeg", JPEG_QUALITY);
    });

    const blobToImage = (blob) => new Promise((resolve, reject) => {
      const image = new window.Image();
      const objectUrl = URL.createObjectURL(blob);
      objectUrls.push(objectUrl);
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = objectUrl;
    });

    const extractFrames = async () => {
      const scale = Math.min(1, MAX_CAPTURE_WIDTH / video.videoWidth);
      const captureCanvas = document.createElement("canvas");
      captureCanvas.width = Math.round(video.videoWidth * scale);
      captureCanvas.height = Math.round(video.videoHeight * scale);
      const captureContext = captureCanvas.getContext("2d", { alpha: false });
      if (!captureContext) throw new Error("Unable to create frame capture context");

      frameCount = Math.min(MAX_FRAMES, Math.max(2, Math.round(video.duration * CAPTURE_FPS)));

      for (let index = 0; index < frameCount; index += 1) {
        if (cancelled) return;
        const time = (index / (frameCount - 1)) * Math.max(video.duration - 0.01, 0);
        await seekTo(time);
        if (cancelled) return;
        captureContext.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
        const blob = await canvasToBlob(captureCanvas);
        const image = await blobToImage(blob);
        if (cancelled) return;
        frames.push(image);
        updateLoader((index + 1) / frameCount);
      }
    };

    const updateTargets = (progress) => {
      const videoProgress = clamp(progress / VIDEO_END);
      const textProgress = clamp(progress / 0.13);
      targetFrame = videoProgress * Math.max(frameCount - 1, 0);
      targetTextProgress = Math.max(targetTextProgress, textProgress);
      cue.style.opacity = progress > 0.015 ? "0" : "0.8";
    };

    const tick = () => {
      if (ready) {
        const frameDifference = targetFrame - currentFrame;
        currentFrame = Math.abs(frameDifference) > 0.01
          ? currentFrame + frameDifference * FRAME_EASE
          : targetFrame;
        drawFrame(currentFrame);
      }

      const textDifference = targetTextProgress - currentTextProgress;
      currentTextProgress = Math.abs(textDifference) > 0.0004
        ? currentTextProgress + textDifference * FRAME_EASE
        : targetTextProgress;
      animateCharacters(currentTextProgress);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    const initialise = async () => {
      try {
        await extractFrames();
        if (cancelled || frames.length === 0) return;
        ready = true;
        frameCount = frames.length;
        resizeCanvas();
        updateTargets(scrollTrigger?.progress || 0);
        currentFrame = targetFrame;
        drawFrame(currentFrame);
        canvas.classList.add(styles.canvasReady);
        poster.classList.add(styles.posterHidden);
        finishLoader();
      } catch (error) {
        console.error("Hero frame extraction failed:", error);
        finishLoader();
      }
    };

    scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => updateTargets(progress),
    });

    const start = () => initialise();
    if (video.readyState >= 1 && video.duration) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        drawFrame(currentFrame);
        ScrollTrigger.refresh();
      }, 120);
    };

    resizeCanvas();
    updateLoader(0);
    animateCharacters(0);
    animationFrameId = window.requestAnimationFrame(tick);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", start);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(animationFrameId);
      loaderTween?.kill();
      scrollTrigger?.kill();
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  return (
    <>
      <div ref={loaderRef} className={styles.loader} role="status" aria-label="Loading Jajimalli experience">
        <div className={styles.loaderLogo}>
          <Image className={styles.loaderLogoBase} src={logo} alt="Jajimalli" priority />
          <div ref={logoFillRef} className={styles.loaderLogoFill}>
            <Image src={logo} alt="" priority />
          </div>
        </div>
        <div className={styles.loaderProgress}>
          <span ref={progressTextRef}>00%</span>
          <div><i ref={progressBarRef} /></div>
        </div>
      </div>

      <section ref={sectionRef} className={styles.scrollSection}>
        <div className={styles.hero}>
        <div ref={posterRef} className={styles.poster}>
          <Image src={heroPoster} alt="" fill priority sizes="100vw" />
        </div>
        <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label="Jajimalli beauty film" />
        <video ref={videoRef} className={styles.source} muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/hereosecton.mp4" type="video/mp4" />
        </video>
        <div className={styles.shade} />
        <div ref={copyRef} className={styles.copy}><AnimatedTitle /></div>
        <span ref={cueRef} className={styles.scrollCue}>Scroll to play</span>
        </div>
      </section>
    </>
  );
}
