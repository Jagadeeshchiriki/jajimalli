import AboutSection from "./components/homepage/AboutSection";
import FeatureSection from "./components/homepage/FeatureSection";
import Footer from "./components/homepage/Footer";
import HappyClientsSection from "./components/homepage/HappyClientsSection";
import Header from "./components/homepage/Header";
import HeroSection from "./components/homepage/HeroSection";
import ServicesSection from "./components/homepage/ServicesSection";
import { seoKeywords } from "./seoKeywords";

export const metadata = {
  title: "Beauty Salon in Visakhapatnam & Tanuku | Jajimalli",
  description: "Jajimalli is a beauty salon in Visakhapatnam and Tanuku for spa, salon, skin laser and professional beauty services.",
  keywords: seoKeywords.home,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <FeatureSection />
      <HappyClientsSection />
      <Footer />
    </main>
  );
}
