import Image from "next/image";
import makeupcourse from "../../images/servicepage/beautyacademy (2).png";
import parlorCourse from "../../images/servicepage/parlorcourse.png";
import ServiceDetailPage from "../components/ServiceDetailPage";
import { academyCourseNames, getService } from "../serviceData";
import AcademyCourseMarquee from "./AcademyCourseMarquee";
import styles from "./BeautyAcademy.module.css";

const service = getService("beauty-academy");

export const metadata = {
  title: service.shortTitle,
  description: service.description,
};

export default function BeautyAcademyPage() {
  return (
    <ServiceDetailPage service={service} showServiceShowcase={false}>
      <section className={styles.feature} aria-labelledby="makeup-course-title">
        <div className={styles.image}>
          <Image
            src={makeupcourse}
            alt="Students receiving hands-on makeup course training at Jajimalli Beauty Academy"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className={styles.copy}>
          <h2 id="makeup-course-title">Turn Your Passion Into Your Profession</h2>
          <p>
            Join our professional beauty academy and learn from experienced experts in a real salon environment.
            Get hands-on training, practical experience, and the skills you need to build a successful career in
            the beauty industry.
          </p>
        </div>
      </section>

      <section className={styles.feature} aria-labelledby="parlor-course-title">
        <div className={styles.copy}>
          <h2 id="parlor-course-title">Discover the Art of Complete Beauty Care</h2>
          <p>
            Build your expertise in essential salon treatments, from rejuvenating facials and skincare to hair
            care, waxing, and grooming. Learn practical techniques that help you deliver personalized beauty
            services with confidence and professional precision.
          </p>
        </div>
        <div className={styles.image}>
          <Image
            src={parlorCourse}
            alt="Beauty academy students learning professional salon and hair care techniques"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>
      <AcademyCourseMarquee courses={academyCourseNames} />
    </ServiceDetailPage>
  );
}
