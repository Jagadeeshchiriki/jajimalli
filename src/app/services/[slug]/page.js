import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "../serviceData";
import ServiceDetailScrollStart from "./ServiceDetailScrollStart";
import ServiceShowcase from "./ServiceShowcase";
import styles from "./ServiceDetail.module.css";

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
      <ServiceDetailScrollStart routeKey={slug} />
      <section className={styles.hero}>
        <Image src={service.image} alt={`${service.shortTitle} at Jajimalli`} fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <h1>{service.shortTitle}</h1>
          <span>{service.description}</span>
        </div>
      </section>

      <ServiceShowcase category={service.shortTitle} offerings={service.offerings} />

      <div className={styles.detailFooter}>
        <Link className={styles.backLink} href="/services">View all categories</Link>
      </div>
    </main>
  );
}
