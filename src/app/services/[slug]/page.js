import Image from "next/image";
import Link from "next/link";
import { DM_Serif_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { getService, services } from "../serviceData";
import styles from "./ServiceDetail.module.css";

const displayFont = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  return service
    ? { title: service.shortTitle, description: service.description }
    : { title: "Service" };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image src={service.image} alt={`${service.shortTitle} at Jajimalli`} fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>Jajimalli Services</p>
          <h1 className={displayFont.className}>{service.shortTitle}</h1>
          <span>{service.tagline}</span>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introHeading}>
          <p>Personal care, thoughtfully delivered</p>
          <h2 className={displayFont.className}>Discover your<br />signature experience.</h2>
        </div>
        <p className={styles.description}>{service.description}</p>
      </section>

      <section className={styles.offerings} aria-labelledby="offerings-title">
        <p>Explore {service.shortTitle}</p>
        <h2 className={displayFont.className} id="offerings-title">Our services</h2>
        <div className={styles.offeringList}>
          {service.offerings.map((offering, index) => (
            <div className={styles.offering} key={offering}>
              <span>0{index + 1}</span>
              <h3 className={displayFont.className}>{offering}</h3>
              <span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
        <Link className={styles.backLink} href="/services">View all categories</Link>
      </section>
    </main>
  );
}
