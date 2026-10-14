import Header from "../components/homepage/Header";
import AboutIntro from "./AboutIntro";
import FounderSection from "./FounderSection";
import OurStory from "./OurStory";
import ServiceRituals from "./ServiceRituals";
import AboutLocations from "./AboutLocations";
import Footer from "../components/homepage/Footer";
import { seoKeywords } from "../seoKeywords";

export const metadata = {
  title: "About Our Beauty Salons in Visakhapatnam & Tanuku",
  description: "Meet Jajimalli, a professional beauty salon in Visakhapatnam and Tanuku combining beauty, wellness and expert care.",
  keywords: seoKeywords.about,
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutIntro />
      <FounderSection />
      <OurStory />
      <ServiceRituals />
      <AboutLocations />
      <Footer />
    </main>
  );
}
