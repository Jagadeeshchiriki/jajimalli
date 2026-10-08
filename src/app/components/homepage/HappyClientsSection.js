"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import client01 from "../../images/homepage/happyclients/jajimalli_client_01.jpg";
import client02 from "../../images/homepage/happyclients/jajimalli_client_02.jpg";
import client03 from "../../images/homepage/happyclients/jajimalli_client_03.jpg";
import client04 from "../../images/homepage/happyclients/jajimalli_client_04.jpg";
import client05 from "../../images/homepage/happyclients/jajimalli_client_05.jpg";
import client06 from "../../images/homepage/happyclients/jajimalli_client_06.jpg";
import client07 from "../../images/homepage/happyclients/jajimalli_client_07.jpg";
import client08 from "../../images/homepage/happyclients/jajimalli_client_08.jpg";
import client09 from "../../images/homepage/happyclients/jajimalli_client_09.jpg";
import client10 from "../../images/homepage/happyclients/jajimalli_client_10.jpg";
import styles from "./HappyClientsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const clientImages = [
  [client01, "center 20%"],
  [client02, "center 18%"],
  [client03, "center 20%"],
  [client04, "center 20%"],
  [client05, "center 20%"],
  [client06, "center 18%"],
  [client07, "center 18%"],
  [client08, "center 18%"],
  [client09, "center 18%"],
  [client10, "center 18%"],
];

function ClientCarousel3D({ progress }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#f5f0e4", 9, 14.5);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0xf5f0e4, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const carousel = new THREE.Group();
    scene.add(carousel);

    const loader = new THREE.TextureLoader();
    const cards = clientImages.map(([image], index) => {
      let mesh;
      const texture = loader.load(image.src, () => {
        if (!disposed && mesh) cropTextureToCard(mesh);
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
        transparent: true,
        toneMapped: false,
      });
      const grayscaleUniform = { value: 1 };
      material.userData.grayscaleUniform = grayscaleUniform;
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uGrayscale = grayscaleUniform;
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <map_fragment>",
            `#include <map_fragment>
            float grayscale = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(grayscale), uGrayscale);`,
          )
          .replace(
            "uniform vec3 diffuse;",
            "uniform vec3 diffuse;\nuniform float uGrayscale;",
          );
      };
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 1.85, 20, 1), material);
      mesh.userData.index = index;
      mesh.userData.grayscale = 1;
      mesh.userData.opacity = 1;
      carousel.add(mesh);
      return mesh;
    });

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let pointerActive = false;
    let animationFrame = 0;
    let disposed = false;
    let lastFrameTime = performance.now();
    let carouselOffset = 0;
    const layout = {
      radiusX: 7.25,
      radiusY: 0,
      depth: 7.2,
      cardWidth: 1.55,
      cardHeight: 1.85,
      vertical: false,
    };

    const createCardGeometry = (width, height, vertical = false) => {
      const geometry = new THREE.PlaneGeometry(
        width,
        height,
        vertical ? 1 : 20,
        vertical ? 20 : 1,
      );
      const positions = geometry.attributes.position;

      for (let index = 0; index < positions.count; index += 1) {
        const normalizedPosition = vertical
          ? positions.getY(index) / (height * 0.5)
          : positions.getX(index) / (width * 0.5);
        const bendSize = vertical ? height : width;
        positions.setZ(index, -Math.pow(normalizedPosition, 2) * bendSize * 0.055);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      return geometry;
    };

    const cropTextureToCard = (card) => {
      const texture = card.material.map;
      const image = texture?.image;
      if (!image?.width || !image?.height) return;

      const imageAspect = image.width / image.height;
      const cardAspect = layout.cardWidth / layout.cardHeight;
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);

      if (imageAspect > cardAspect) {
        texture.repeat.x = cardAspect / imageAspect;
        texture.offset.x = (1 - texture.repeat.x) * 0.5;
      } else {
        texture.repeat.y = imageAspect / cardAspect;
        texture.offset.y = 1 - texture.repeat.y;
      }

      const edgeInset = 0.015;
      texture.offset.x += texture.repeat.x * edgeInset;
      texture.offset.y += texture.repeat.y * edgeInset;
      texture.repeat.multiplyScalar(1 - edgeInset * 2);

      texture.needsUpdate = true;
    };

    const layoutCards = () => {
      const verticalMobile = mount.clientWidth < 500;
      const mobile = mount.clientWidth < 800;
      layout.vertical = verticalMobile;
      layout.radiusX = verticalMobile
        ? 0
        : mobile
          ? 3.25
          : Math.min(7.5, Math.max(6.7, camera.aspect * 3.8));
      layout.radiusY = verticalMobile ? 4 : 0;
      layout.depth = verticalMobile ? 5.6 : mobile ? 5.3 : 7.2;
      layout.cardWidth = verticalMobile ? 1.45 : mobile ? 0.8 : 1.55;
      layout.cardHeight = verticalMobile ? 1.85 : mobile ? 1 : 1.85;

      cards.forEach((card) => {
        card.geometry.dispose();
        card.geometry = createCardGeometry(layout.cardWidth, layout.cardHeight, layout.vertical);
        cropTextureToCard(card);
      });
    };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      layoutCards();
    };

    const handlePointerMove = (event) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    const render = (frameTime = performance.now()) => {
      if (disposed) return;

      const delta = Math.min((frameTime - lastFrameTime) / 1000, 0.05);
      lastFrameTime = frameTime;
      const easing = 1 - Math.exp(-delta * 5.5);
      const revealEasing = 1 - Math.exp(-delta * 4);
      const targetOffset = progress.current * 1.6;
      carouselOffset = THREE.MathUtils.lerp(carouselOffset, targetOffset, easing);

      const cardStates = cards.map((card, index) => {
        const rawPosition = index / cards.length + carouselOffset + 0.5;
        const wrappedPosition = ((rawPosition % 1) + 1) % 1 - 0.5;
        return { card, wrappedPosition };
      });
      const visibleCards = layout.vertical
        ? new Set(
            [...cardStates]
              .sort((a, b) => Math.abs(a.wrappedPosition) - Math.abs(b.wrappedPosition))
              .slice(0, 3)
              .map(({ card }) => card),
          )
        : null;

      cardStates.forEach(({ card, wrappedPosition }) => {
        const angle = wrappedPosition * (layout.vertical ? 5 : 3);
        const circularDepth = Math.max(0, Math.cos(angle));
        const depthPosition = Math.cos(angle) * layout.depth - layout.depth * 0.48;
        const targetOpacity = !layout.vertical || visibleCards.has(card) ? 1 : 0;
        card.userData.opacity = THREE.MathUtils.lerp(
          card.userData.opacity,
          targetOpacity,
          revealEasing,
        );
        card.material.opacity = card.userData.opacity;
        card.visible = targetOpacity > 0 || card.userData.opacity > 0.01;
        card.userData.centerDistance = Math.abs(wrappedPosition);

        if (layout.vertical) {
          card.position.set(0, -Math.sin(angle) * layout.radiusY, depthPosition);
          card.rotation.set(angle * 0.68, 0, 0);
        } else {
          card.position.set(
            Math.sin(angle) * layout.radiusX,
            -1.42 + circularDepth * 1.12,
            depthPosition,
          );
          card.rotation.set(0, -angle * 0.72, -Math.sin(angle) * 0.055);
        }

        const depthScale = 0.64 + circularDepth * 0.68;
        card.scale.setScalar(depthScale);
        card.renderOrder = Math.round((depthPosition + layout.depth) * 100);
      });

      carousel.rotation.x = THREE.MathUtils.lerp(
        carousel.rotation.x,
        -0.035 + pointer.y * 0.018,
        easing,
      );
      carousel.rotation.y = THREE.MathUtils.lerp(
        carousel.rotation.y,
        pointer.x * 0.018,
        easing,
      );

      const targetScale = 0.98 + progress.current * 0.02;
      carousel.scale.setScalar(THREE.MathUtils.lerp(carousel.scale.x, targetScale, easing));

      scene.updateMatrixWorld();
      raycaster.setFromCamera(pointer, camera);
      const hoveredCard = pointerActive ? raycaster.intersectObjects(cards, false)[0]?.object : null;

      cards.forEach((card) => {
        const targetGrayscale = layout.vertical
          ? THREE.MathUtils.smoothstep(card.userData.centerDistance, 0.025, 0.12)
          : card === hoveredCard
            ? 0
            : 1;
        card.userData.grayscale = THREE.MathUtils.lerp(
          card.userData.grayscale,
          targetGrayscale,
          easing,
        );
        card.material.userData.grayscaleUniform.value = card.userData.grayscale;
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", handlePointerMove, { passive: true });
    mount.addEventListener("pointerleave", handlePointerLeave);
    resize();
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);

      cards.forEach((card) => {
        card.geometry.dispose();
        card.material.map?.dispose();
        card.material.dispose();
      });
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [progress]);

  return <div ref={mountRef} className={styles.webglMount} />;
}

export default function HappyClientsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollProgressRef = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            scrollProgressRef.current = progress;
          },
        },
      });

      timeline.to(title, { autoAlpha: 0, yPercent: -35, duration: 0.16, ease: "power1.in" }, 0.08);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="happy-clients-title">
      <div
        className={`${styles.stickyLayer} sticky__layer sticky__layer--sticky is-inview`}
        data-scroll
        data-scroll-sticky
      >
        <div className={styles.canvasLayer} aria-hidden="true">
          <ClientCarousel3D progress={scrollProgressRef} />
          <div className={styles.vignette} />
        </div>

        <div ref={titleRef} className={styles.titleBlock}>
          {/* <span>Celebrating our</span> */}
          <h2 id="happy-clients-title">Happy Clients</h2>
          {/* <p>Real moments. Beautiful transformations.</p> */}
        </div>

      </div>

      <div className={`${styles.copyLayer} sticky__layer pb-2`}>
        <div className={styles.firstStatement}>
          <p>
            Every smile tells a story of care, confidence, and a little time
            devoted entirely to you.
          </p>
        </div>

        <div className={styles.copySpacer} />

        <div className={styles.finalStatement}>
          <p>
            More Than A Beauty Ritual.<br />
            A Feeling You CarryWith You.
          </p>
        </div>
      </div>
    </section>
  );
}
