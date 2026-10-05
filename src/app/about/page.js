import Header from "../components/homepage/Header";
import AboutIntro from "./AboutIntro";
import OurStory from "./OurStory";
import ServiceRituals from "./ServiceRituals";
import AboutLocations from "./AboutLocations";
import Footer from "../components/homepage/Footer";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutIntro />
      <OurStory />
      <ServiceRituals />
      <AboutLocations />
      <Footer />
    </main>
  );
}
