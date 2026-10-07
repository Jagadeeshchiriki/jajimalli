import AboutSection from "./components/homepage/AboutSection";
import FeatureSection from "./components/homepage/FeatureSection";
import Footer from "./components/homepage/Footer";
import HappyClientsSection from "./components/homepage/HappyClientsSection";
import Header from "./components/homepage/Header";
import HeroSection from "./components/homepage/HeroSection";
import ServicesSection from "./components/homepage/ServicesSection";

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
