import AboutSection from "./components/homepage/AboutSection";
import FeatureSection from "./components/homepage/FeatureSection";
import Footer from "./components/homepage/Footer";
import GallerySection from "./components/homepage/GallerySection";
import HappyClientsSection from "./components/homepage/HappyClientsSection";
import Header from "./components/homepage/Header";
import HeroSection from "./components/homepage/HeroSection";
import PortraitSection from "./components/homepage/PortraitSection";
import ServicesSection from "./components/homepage/ServicesSection";
import Hero360 from "./components/homepage/Hero360";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero360 />
      <ServicesSection />
      <AboutSection />
      <FeatureSection />
      {/* <GallerySection /> */}
      <HappyClientsSection />
      <PortraitSection />
      <Footer />
    </main>
  );
}
