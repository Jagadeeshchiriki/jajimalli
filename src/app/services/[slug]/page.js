import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { academyCourseNames, getService, services } from "../serviceData";
import beautyAcademyTraining from "../../images/servicepage/beautyacademy (2).png";
import AcademyCourseMarquee from "./AcademyCourseMarquee";
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
      <section className={styles.hero} data-menu-icon-tone="dark">
        <Image src={service.image} alt={`${service.shortTitle} at Jajimalli`} fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <h1>{service.shortTitle}</h1>
          <span>{service.description}</span>
        </div>
      </section>

      <ServiceShowcase category={service.shortTitle} offerings={service.offerings} />

      {slug === "beauty-academy" && (
        <>
          <section className={styles.academyFeature} aria-labelledby="academy-feature-title">
            <div className={styles.academyImage}>
              <Image
                src={beautyAcademyTraining}
                alt="Students receiving hands-on makeup training at Jajimalli Beauty Academy"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </div>
            <div className={styles.academyCopy}>
              <h2 id="academy-feature-title">Turn Your Passion Into Your Profession</h2>
              <p>
                Join our professional beauty academy and learn from experienced experts in a real salon environment.
                Get hands-on training, practical experience, and the skills you need to build a successful career in
                the beauty industry.
              </p>
            </div>
          </section>
          <AcademyCourseMarquee courses={academyCourseNames} />
        </>
      )}

      <div className={styles.detailFooter}>
        <Link className={styles.backLink} href="/services">View all categories</Link>
      </div>
    </main>
  );
}
