"use client";

import { useEffect, useRef } from "react";
import { DM_Serif_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero360.module.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   FRAME IMPORTS
========================================================= */

import frame_001 from "../../images/hero/frames/frame_001.webp";
import frame_002 from "../../images/hero/frames/frame_002.webp";
import frame_003 from "../../images/hero/frames/frame_003.webp";
import frame_004 from "../../images/hero/frames/frame_004.webp";
import frame_005 from "../../images/hero/frames/frame_005.webp";
import frame_006 from "../../images/hero/frames/frame_006.webp";
import frame_007 from "../../images/hero/frames/frame_007.webp";
import frame_008 from "../../images/hero/frames/frame_008.webp";
import frame_009 from "../../images/hero/frames/frame_009.webp";
import frame_010 from "../../images/hero/frames/frame_010.webp";
import frame_011 from "../../images/hero/frames/frame_011.webp";
import frame_012 from "../../images/hero/frames/frame_012.webp";
import frame_013 from "../../images/hero/frames/frame_013.webp";
import frame_014 from "../../images/hero/frames/frame_014.webp";
import frame_015 from "../../images/hero/frames/frame_015.webp";
import frame_016 from "../../images/hero/frames/frame_016.webp";
import frame_017 from "../../images/hero/frames/frame_017.webp";
import frame_018 from "../../images/hero/frames/frame_018.webp";
import frame_019 from "../../images/hero/frames/frame_019.webp";
import frame_020 from "../../images/hero/frames/frame_020.webp";
import frame_021 from "../../images/hero/frames/frame_021.webp";
import frame_022 from "../../images/hero/frames/frame_022.webp";
import frame_023 from "../../images/hero/frames/frame_023.webp";
import frame_024 from "../../images/hero/frames/frame_024.webp";
import frame_025 from "../../images/hero/frames/frame_025.webp";
import frame_026 from "../../images/hero/frames/frame_026.webp";
import frame_027 from "../../images/hero/frames/frame_027.webp";
import frame_028 from "../../images/hero/frames/frame_028.webp";
import frame_029 from "../../images/hero/frames/frame_029.webp";
import frame_030 from "../../images/hero/frames/frame_030.webp";
import frame_031 from "../../images/hero/frames/frame_031.webp";
import frame_032 from "../../images/hero/frames/frame_032.webp";
import frame_033 from "../../images/hero/frames/frame_033.webp";
import frame_034 from "../../images/hero/frames/frame_034.webp";
import frame_035 from "../../images/hero/frames/frame_035.webp";
import frame_036 from "../../images/hero/frames/frame_036.webp";
import frame_037 from "../../images/hero/frames/frame_037.webp";
import frame_038 from "../../images/hero/frames/frame_038.webp";
import frame_039 from "../../images/hero/frames/frame_039.webp";
import frame_040 from "../../images/hero/frames/frame_040.webp";
import frame_041 from "../../images/hero/frames/frame_041.webp";
import frame_042 from "../../images/hero/frames/frame_042.webp";
import frame_043 from "../../images/hero/frames/frame_043.webp";
import frame_044 from "../../images/hero/frames/frame_044.webp";
import frame_045 from "../../images/hero/frames/frame_045.webp";
import frame_046 from "../../images/hero/frames/frame_046.webp";
import frame_047 from "../../images/hero/frames/frame_047.webp";
import frame_048 from "../../images/hero/frames/frame_048.webp";
import frame_049 from "../../images/hero/frames/frame_049.webp";
import frame_050 from "../../images/hero/frames/frame_050.webp";
import frame_051 from "../../images/hero/frames/frame_051.webp";
import frame_052 from "../../images/hero/frames/frame_052.webp";
import frame_053 from "../../images/hero/frames/frame_053.webp";
import frame_054 from "../../images/hero/frames/frame_054.webp";
import frame_055 from "../../images/hero/frames/frame_055.webp";
import frame_056 from "../../images/hero/frames/frame_056.webp";
import frame_057 from "../../images/hero/frames/frame_057.webp";
import frame_058 from "../../images/hero/frames/frame_058.webp";
import frame_059 from "../../images/hero/frames/frame_059.webp";
import frame_060 from "../../images/hero/frames/frame_060.webp";
import frame_061 from "../../images/hero/frames/frame_061.webp";
import frame_062 from "../../images/hero/frames/frame_062.webp";
import frame_063 from "../../images/hero/frames/frame_063.webp";
import frame_064 from "../../images/hero/frames/frame_064.webp";
import frame_065 from "../../images/hero/frames/frame_065.webp";
import frame_066 from "../../images/hero/frames/frame_066.webp";
import frame_067 from "../../images/hero/frames/frame_067.webp";
import frame_068 from "../../images/hero/frames/frame_068.webp";
import frame_069 from "../../images/hero/frames/frame_069.webp";
import frame_070 from "../../images/hero/frames/frame_070.webp";
import frame_071 from "../../images/hero/frames/frame_071.webp";
import frame_072 from "../../images/hero/frames/frame_072.webp";
import frame_073 from "../../images/hero/frames/frame_073.webp";
import frame_074 from "../../images/hero/frames/frame_074.webp";
import frame_075 from "../../images/hero/frames/frame_075.webp";
import frame_076 from "../../images/hero/frames/frame_076.webp";
import frame_077 from "../../images/hero/frames/frame_077.webp";
import frame_078 from "../../images/hero/frames/frame_078.webp";
import frame_079 from "../../images/hero/frames/frame_079.webp";
import frame_080 from "../../images/hero/frames/frame_080.webp";
import frame_081 from "../../images/hero/frames/frame_081.webp";
import frame_082 from "../../images/hero/frames/frame_082.webp";
import frame_083 from "../../images/hero/frames/frame_083.webp";
import frame_084 from "../../images/hero/frames/frame_084.webp";
import frame_085 from "../../images/hero/frames/frame_085.webp";
import frame_086 from "../../images/hero/frames/frame_086.webp";
import frame_087 from "../../images/hero/frames/frame_087.webp";
import frame_088 from "../../images/hero/frames/frame_088.webp";
import frame_089 from "../../images/hero/frames/frame_089.webp";
import frame_090 from "../../images/hero/frames/frame_090.webp";
import frame_091 from "../../images/hero/frames/frame_091.webp";
import frame_092 from "../../images/hero/frames/frame_092.webp";
import frame_093 from "../../images/hero/frames/frame_093.webp";
import frame_094 from "../../images/hero/frames/frame_094.webp";
import frame_095 from "../../images/hero/frames/frame_095.webp";
import frame_096 from "../../images/hero/frames/frame_096.webp";
import frame_097 from "../../images/hero/frames/frame_097.webp";
import frame_098 from "../../images/hero/frames/frame_098.webp";
import frame_099 from "../../images/hero/frames/frame_099.webp";
import frame_100 from "../../images/hero/frames/frame_100.webp";
import frame_101 from "../../images/hero/frames/frame_101.webp";
import frame_102 from "../../images/hero/frames/frame_102.webp";
import frame_103 from "../../images/hero/frames/frame_103.webp";
import frame_104 from "../../images/hero/frames/frame_104.webp";
import frame_105 from "../../images/hero/frames/frame_105.webp";
import frame_106 from "../../images/hero/frames/frame_106.webp";
import frame_107 from "../../images/hero/frames/frame_107.webp";
import frame_108 from "../../images/hero/frames/frame_108.webp";
import frame_109 from "../../images/hero/frames/frame_109.webp";
import frame_110 from "../../images/hero/frames/frame_110.webp";
import frame_111 from "../../images/hero/frames/frame_111.webp";
import frame_112 from "../../images/hero/frames/frame_112.webp";
import frame_113 from "../../images/hero/frames/frame_113.webp";
import frame_114 from "../../images/hero/frames/frame_114.webp";
import frame_115 from "../../images/hero/frames/frame_115.webp";
import frame_116 from "../../images/hero/frames/frame_116.webp";
import frame_117 from "../../images/hero/frames/frame_117.webp";
import frame_118 from "../../images/hero/frames/frame_118.webp";
import frame_119 from "../../images/hero/frames/frame_119.webp";
import frame_120 from "../../images/hero/frames/frame_120.webp";
import frame_121 from "../../images/hero/frames/frame_121.webp";
import frame_122 from "../../images/hero/frames/frame_122.webp";
import frame_123 from "../../images/hero/frames/frame_123.webp";
import frame_124 from "../../images/hero/frames/frame_124.webp";
import frame_125 from "../../images/hero/frames/frame_125.webp";
import frame_126 from "../../images/hero/frames/frame_126.webp";
import frame_127 from "../../images/hero/frames/frame_127.webp";
import frame_128 from "../../images/hero/frames/frame_128.webp";
import frame_129 from "../../images/hero/frames/frame_129.webp";
import frame_130 from "../../images/hero/frames/frame_130.webp";
import frame_131 from "../../images/hero/frames/frame_131.webp";
import frame_132 from "../../images/hero/frames/frame_132.webp";
import frame_133 from "../../images/hero/frames/frame_133.webp";
import frame_134 from "../../images/hero/frames/frame_134.webp";
import frame_135 from "../../images/hero/frames/frame_135.webp";
import frame_136 from "../../images/hero/frames/frame_136.webp";
import frame_137 from "../../images/hero/frames/frame_137.webp";
import frame_138 from "../../images/hero/frames/frame_138.webp";
import frame_139 from "../../images/hero/frames/frame_139.webp";
import frame_140 from "../../images/hero/frames/frame_140.webp";
import frame_141 from "../../images/hero/frames/frame_141.webp";
import frame_142 from "../../images/hero/frames/frame_142.webp";
import frame_143 from "../../images/hero/frames/frame_143.webp";
import frame_144 from "../../images/hero/frames/frame_144.webp";
import frame_145 from "../../images/hero/frames/frame_145.webp";
import frame_146 from "../../images/hero/frames/frame_146.webp";
import frame_147 from "../../images/hero/frames/frame_147.webp";
import frame_148 from "../../images/hero/frames/frame_148.webp";
import frame_149 from "../../images/hero/frames/frame_149.webp";
import frame_150 from "../../images/hero/frames/frame_150.webp";
import frame_151 from "../../images/hero/frames/frame_151.webp";
import frame_152 from "../../images/hero/frames/frame_152.webp";
import frame_153 from "../../images/hero/frames/frame_153.webp";
import frame_154 from "../../images/hero/frames/frame_154.webp";
import frame_155 from "../../images/hero/frames/frame_155.webp";
import frame_156 from "../../images/hero/frames/frame_156.webp";
import frame_157 from "../../images/hero/frames/frame_157.webp";
import frame_158 from "../../images/hero/frames/frame_158.webp";
import frame_159 from "../../images/hero/frames/frame_159.webp";
import frame_160 from "../../images/hero/frames/frame_160.webp";
import frame_161 from "../../images/hero/frames/frame_161.webp";
import frame_162 from "../../images/hero/frames/frame_162.webp";
import frame_163 from "../../images/hero/frames/frame_163.webp";
import frame_164 from "../../images/hero/frames/frame_164.webp";
import frame_165 from "../../images/hero/frames/frame_165.webp";
import frame_166 from "../../images/hero/frames/frame_166.webp";
import frame_167 from "../../images/hero/frames/frame_167.webp";
import frame_168 from "../../images/hero/frames/frame_168.webp";
import frame_169 from "../../images/hero/frames/frame_169.webp";
import frame_170 from "../../images/hero/frames/frame_170.webp";
import frame_171 from "../../images/hero/frames/frame_171.webp";
import frame_172 from "../../images/hero/frames/frame_172.webp";
import frame_173 from "../../images/hero/frames/frame_173.webp";
import frame_174 from "../../images/hero/frames/frame_174.webp";
import frame_175 from "../../images/hero/frames/frame_175.webp";
import frame_176 from "../../images/hero/frames/frame_176.webp";
import frame_177 from "../../images/hero/frames/frame_177.webp";
import frame_178 from "../../images/hero/frames/frame_178.webp";
import frame_179 from "../../images/hero/frames/frame_179.webp";
import frame_180 from "../../images/hero/frames/frame_180.webp";
import frame_181 from "../../images/hero/frames/frame_181.webp";
import frame_182 from "../../images/hero/frames/frame_182.webp";
import frame_183 from "../../images/hero/frames/frame_183.webp";
import frame_184 from "../../images/hero/frames/frame_184.webp";
import frame_185 from "../../images/hero/frames/frame_185.webp";
import frame_186 from "../../images/hero/frames/frame_186.webp";
import frame_187 from "../../images/hero/frames/frame_187.webp";
import frame_188 from "../../images/hero/frames/frame_188.webp";
import frame_189 from "../../images/hero/frames/frame_189.webp";
import frame_190 from "../../images/hero/frames/frame_190.webp";
import frame_191 from "../../images/hero/frames/frame_191.webp";
import frame_192 from "../../images/hero/frames/frame_192.webp";
import frame_193 from "../../images/hero/frames/frame_193.webp";
import frame_194 from "../../images/hero/frames/frame_194.webp";
import frame_195 from "../../images/hero/frames/frame_195.webp";
import frame_196 from "../../images/hero/frames/frame_196.webp";
import frame_197 from "../../images/hero/frames/frame_197.webp";
import frame_198 from "../../images/hero/frames/frame_198.webp";
import frame_199 from "../../images/hero/frames/frame_199.webp";
import frame_200 from "../../images/hero/frames/frame_200.webp";
import frame_201 from "../../images/hero/frames/frame_201.webp";
import frame_202 from "../../images/hero/frames/frame_202.webp";
import frame_203 from "../../images/hero/frames/frame_203.webp";
import frame_204 from "../../images/hero/frames/frame_204.webp";
import frame_205 from "../../images/hero/frames/frame_205.webp";
import frame_206 from "../../images/hero/frames/frame_206.webp";
import frame_207 from "../../images/hero/frames/frame_207.webp";
import frame_208 from "../../images/hero/frames/frame_208.webp";
import frame_209 from "../../images/hero/frames/frame_209.webp";
import frame_210 from "../../images/hero/frames/frame_210.webp";
import frame_211 from "../../images/hero/frames/frame_211.webp";
import frame_212 from "../../images/hero/frames/frame_212.webp";
import frame_213 from "../../images/hero/frames/frame_213.webp";
import frame_214 from "../../images/hero/frames/frame_214.webp";
import frame_215 from "../../images/hero/frames/frame_215.webp";
import frame_216 from "../../images/hero/frames/frame_216.webp";
import frame_217 from "../../images/hero/frames/frame_217.webp";
import frame_218 from "../../images/hero/frames/frame_218.webp";
import frame_219 from "../../images/hero/frames/frame_219.webp";
import frame_220 from "../../images/hero/frames/frame_220.webp";
import frame_221 from "../../images/hero/frames/frame_221.webp";
import frame_222 from "../../images/hero/frames/frame_222.webp";
import frame_223 from "../../images/hero/frames/frame_223.webp";
import frame_224 from "../../images/hero/frames/frame_224.webp";
import frame_225 from "../../images/hero/frames/frame_225.webp";
import frame_226 from "../../images/hero/frames/frame_226.webp";
import frame_227 from "../../images/hero/frames/frame_227.webp";
import frame_228 from "../../images/hero/frames/frame_228.webp";
import frame_229 from "../../images/hero/frames/frame_229.webp";
import frame_230 from "../../images/hero/frames/frame_230.webp";
import frame_231 from "../../images/hero/frames/frame_231.webp";
import frame_232 from "../../images/hero/frames/frame_232.webp";
import frame_233 from "../../images/hero/frames/frame_233.webp";
import frame_234 from "../../images/hero/frames/frame_234.webp";
import frame_235 from "../../images/hero/frames/frame_235.webp";
import frame_236 from "../../images/hero/frames/frame_236.webp";
import frame_237 from "../../images/hero/frames/frame_237.webp";
import frame_238 from "../../images/hero/frames/frame_238.webp";
import frame_239 from "../../images/hero/frames/frame_239.webp";
import frame_240 from "../../images/hero/frames/frame_240.webp";


/* =========================================================
   FRAME ARRAY
========================================================= */

const frames = [
  frame_001.src,
  frame_002.src,
  frame_003.src,
  frame_004.src,
  frame_005.src,
  frame_006.src,
  frame_007.src,
  frame_008.src,
  frame_009.src,
  frame_010.src,
  frame_011.src,
  frame_012.src,
  frame_013.src,
  frame_014.src,
  frame_015.src,
  frame_016.src,
  frame_017.src,
  frame_018.src,
  frame_019.src,
  frame_020.src,
  frame_021.src,
  frame_022.src,
  frame_023.src,
  frame_024.src,
  frame_025.src,
  frame_026.src,
  frame_027.src,
  frame_028.src,
  frame_029.src,
  frame_030.src,
  frame_031.src,
  frame_032.src,
  frame_033.src,
  frame_034.src,
  frame_035.src,
  frame_036.src,
  frame_037.src,
  frame_038.src,
  frame_039.src,
  frame_040.src,
  frame_041.src,
  frame_042.src,
  frame_043.src,
  frame_044.src,
  frame_045.src,
  frame_046.src,
  frame_047.src,
  frame_048.src,
  frame_049.src,
  frame_050.src,
  frame_051.src,
  frame_052.src,
  frame_053.src,
  frame_054.src,
  frame_055.src,
  frame_056.src,
  frame_057.src,
  frame_058.src,
  frame_059.src,
  frame_060.src,
  frame_061.src,
  frame_062.src,
  frame_063.src,
  frame_064.src,
  frame_065.src,
  frame_066.src,
  frame_067.src,
  frame_068.src,
  frame_069.src,
  frame_070.src,
  frame_071.src,
  frame_072.src,
  frame_073.src,
  frame_074.src,
  frame_075.src,
  frame_076.src,
  frame_077.src,
  frame_078.src,
  frame_079.src,
  frame_080.src,
  frame_081.src,
  frame_082.src,
  frame_083.src,
  frame_084.src,
  frame_085.src,
  frame_086.src,
  frame_087.src,
  frame_088.src,
  frame_089.src,
  frame_090.src,
  frame_091.src,
  frame_092.src,
  frame_093.src,
  frame_094.src,
  frame_095.src,
  frame_096.src,
  frame_097.src,
  frame_098.src,
  frame_099.src,
  frame_100.src,
  frame_101.src,
  frame_102.src,
  frame_103.src,
  frame_104.src,
  frame_105.src,
  frame_106.src,
  frame_107.src,
  frame_108.src,
  frame_109.src,
  frame_110.src,
  frame_111.src,
  frame_112.src,
  frame_113.src,
  frame_114.src,
  frame_115.src,
  frame_116.src,
  frame_117.src,
  frame_118.src,
  frame_119.src,
  frame_120.src,
  frame_121.src,
  frame_122.src,
  frame_123.src,
  frame_124.src,
  frame_125.src,
  frame_126.src,
  frame_127.src,
  frame_128.src,
  frame_129.src,
  frame_130.src,
  frame_131.src,
  frame_132.src,
  frame_133.src,
  frame_134.src,
  frame_135.src,
  frame_136.src,
  frame_137.src,
  frame_138.src,
  frame_139.src,
  frame_140.src,
  frame_141.src,
  frame_142.src,
  frame_143.src,
  frame_144.src,
  frame_145.src,
  frame_146.src,
  frame_147.src,
  frame_148.src,
  frame_149.src,
  frame_150.src,
  frame_151.src,
  frame_152.src,
  frame_153.src,
  frame_154.src,
  frame_155.src,
  frame_156.src,
  frame_157.src,
  frame_158.src,
  frame_159.src,
  frame_160.src,
  frame_161.src,
  frame_162.src,
  frame_163.src,
  frame_164.src,
  frame_165.src,
  frame_166.src,
  frame_167.src,
  frame_168.src,
  frame_169.src,
  frame_170.src,
  frame_171.src,
  frame_172.src,
  frame_173.src,
  frame_174.src,
  frame_175.src,
  frame_176.src,
  frame_177.src,
  frame_178.src,
  frame_179.src,
  frame_180.src,
  frame_181.src,
  frame_182.src,
  frame_183.src,
  frame_184.src,
  frame_185.src,
  frame_186.src,
  frame_187.src,
  frame_188.src,
  frame_189.src,
  frame_190.src,
  frame_191.src,
  frame_192.src,
  frame_193.src,
  frame_194.src,
  frame_195.src,
  frame_196.src,
  frame_197.src,
  frame_198.src,
  frame_199.src,
  frame_200.src,
  frame_201.src,
  frame_202.src,
  frame_203.src,
  frame_204.src,
  frame_205.src,
  frame_206.src,
  frame_207.src,
  frame_208.src,
  frame_209.src,
  frame_210.src,
  frame_211.src,
  frame_212.src,
  frame_213.src,
  frame_214.src,
  frame_215.src,
  frame_216.src,
  frame_217.src,
  frame_218.src,
  frame_219.src,
  frame_220.src,
  frame_221.src,
  frame_222.src,
  frame_223.src,
  frame_224.src,
  frame_225.src,
  frame_226.src,
  frame_227.src,
  frame_228.src,
  frame_229.src,
  frame_230.src,
  frame_231.src,
  frame_232.src,
  frame_233.src,
  frame_234.src,
  frame_235.src,
  frame_236.src,
  frame_237.src,
  frame_238.src,
  frame_239.src,
  frame_240.src,
];


/* =========================================================
   COMPONENT
========================================================= */

export default function Hero360() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const images = [];

    let currentFrame = 0;
    let loadedFrames = 0;
    let disposed = false;

    const animation = {
      frame: 0,
    };

    const markFrameLoaded = () => {
      if (disposed) return;

      loadedFrames += 1;
      window.dispatchEvent(new CustomEvent("jajimalli:hero-progress", {
        detail: { progress: loadedFrames / frames.length },
      }));
    };


    /* =====================================================
       DRAW FRAME
    ===================================================== */

    const drawFrame = (index) => {
      const image = images[index];

      if (!image || !image.complete) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
      );


      /*
        COVER

        The image completely fills the viewport.
        No artificial margin or padding.
      */

      const imageRatio =
        image.width / image.height;

      const screenRatio =
        canvasWidth / canvasHeight;

      let width;
      let height;


      if (imageRatio > screenRatio) {
        /*
          Image is wider than viewport
        */

        height = canvasHeight;

        width =
          canvasHeight * imageRatio;

      } else {
        /*
          Image is taller than viewport
        */

        width = canvasWidth;

        height =
          canvasWidth / imageRatio;
      }


      const x =
        (canvasWidth - width) / 2;

      const y =
        (canvasHeight - height) / 2;


      ctx.drawImage(
        image,
        x,
        y,
        width,
        height
      );
    };


    /* =====================================================
       RESIZE CANVAS
    ===================================================== */

    const resizeCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      drawFrame(currentFrame);
    };


    /* =====================================================
       PRELOAD ALL FRAMES
    ===================================================== */

    frames.forEach((src, index) => {
      const image = new window.Image();

      image.src = src;

      image.onload = () => {
        images[index] = image;

        if (index === 0) {
          drawFrame(0);
        }

        markFrameLoaded();
      };

      image.onerror = markFrameLoaded;
    });


    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );


    /* =====================================================
       360° SCROLL ANIMATION
    ===================================================== */

    const tween = gsap.to(animation, {
      frame: frames.length - 1,

      ease: "none",

      scrollTrigger: {
        trigger: section,

        start: "top top",

        /*
          Quick 360° rotation.
        */

        end: "+=1100",

        /*
          Small scrub value gives
          smooth frame following.
        */

        scrub: 0.08,
      },

      onUpdate: () => {
        const frame =
          Math.round(animation.frame);

        if (
          frame !== currentFrame
        ) {
          currentFrame = frame;

          drawFrame(currentFrame);
        }
      },
    });


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      disposed = true;

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      tween.scrollTrigger?.kill();

      tween.kill();
    };

  }, []);


  /* =======================================================
     TEXT ANIMATION
  ======================================================= */

  useEffect(() => {
    const title = titleRef.current;

    if (!title) return;

    const words =
      title.querySelectorAll(
        "[data-word]"
      );

    const context =
      gsap.context(() => {

        gsap.fromTo(
          words,

          {
            yPercent: 115,

            rotationX: -70,

            opacity: 0,
          },

          {
            yPercent: 0,

            rotationX: 0,

            opacity: 1,

            duration: 1.15,

            stagger: 0.09,

            ease: "power4.out",

            transformOrigin:
              "50% 100%",

            delay: 0.15,

            clearProps:
              "transform,opacity",
          }
        );

      }, title);

    return () => {
      context.revert();
    };

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      className={styles.scrollSection}
    >

      <div className={styles.hero}>

      {/* 360° CANVAS */}

      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />


      {/* TEXT */}

      <div className={styles.content}>

        <h1
          ref={titleRef}
          className={`${styles.title} ${dmSerifDisplay.className}`}
          style={{
            perspective: "900px",
          }}
        >

          {"Reveal the Beauty That’s Uniquely You."
            .split(" ")
            .map((word, index) => (

              <span
                key={`${word}-${index}`}
                className={styles.wordMask}
              >

                <span
                  data-word
                  className={styles.word}
                >
                  {word}
                </span>

              </span>

            ))}

        </h1>

      </div>


      {/* SCROLL INDICATOR */}

      <div
        className={styles.scrollIndicator}
      >

        <span>SCROLL</span>

        <span
          className={styles.arrow}
        >
          ↓
        </span>

      </div>

      </div>

    </section>
  );
}
