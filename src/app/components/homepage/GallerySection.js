import Image from "next/image";
import client01 from "../../images/homepage/happyclients/c84c958d-6f1c-44b3-90fe-6fe33b7bcd10.png";
import client02 from "../../images/homepage/happyclients/d503a743-004f-48be-a8ec-de31af6c67c9.png";
import client03 from "../../images/homepage/happyclients/happyclient.png";
import client05 from "../../images/homepage/happyclients/hpcl3.jpeg";
import client06 from "../../images/homepage/happyclients/IMG_0789.jpeg";
import client07 from "../../images/homepage/happyclients/IMG_5213.jpeg";
import client08 from "../../images/homepage/happyclients/IMG_6877.jpg";
import client09 from "../../images/homepage/happyclients/IMG_7799.jpg";
import client10 from "../../images/homepage/happyclients/IMG_8042.jpg";
import client11 from "../../images/homepage/happyclients/IMG_8132.jpg";
import styles from "./GalleryMarquee.module.css";

const galleryRows = [
  [
    [client01, "center 20%"],
    [client02, "center 18%"],
    [client03, "center 20%"],
    [client05, "center 20%"],
    [client06, "center 20%"],
  ],
  [
    [client07, "center 18%"],
    [client08, "center 18%"],
    [client09, "center 18%"],
    [client10, "center 18%"],
    [client11, "center 18%"],
  ],
];

function GalleryGroup({ images, duplicate, rowIndex }) {
  return (
    <div className={styles.group} aria-hidden={duplicate || undefined}>
      {images.map(([src, position], imageIndex) => (
        <div
          className={styles.item}
          key={`${rowIndex}-${duplicate ? "duplicate" : "original"}-${imageIndex}`}
        >
          <Image
            src={src}
            alt={duplicate ? "" : `Jajimalli beauty look ${rowIndex * images.length + imageIndex + 1}`}
            fill
            unoptimized
            sizes="(max-width: 800px) 62vw, 24vw"
            style={{ objectPosition: position }}
          />
        </div>
      ))}
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className={styles.section}>
      <h2>Beauty that speaks for itself.</h2>
      <p>Thoughtfully crafted treatments, exceptional care, and<br />moments of relaxation our clients love to return to.</p>

      <div className={styles.rows}>
        {galleryRows.map((images, rowIndex) => (
          <div className={styles.marquee} key={`row-${rowIndex}`}>
            <div className={`${styles.track} ${rowIndex === 0 ? styles.moveRight : styles.moveLeft}`}>
              <GalleryGroup images={images} duplicate={false} rowIndex={rowIndex} />
              <GalleryGroup images={images} duplicate rowIndex={rowIndex} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
