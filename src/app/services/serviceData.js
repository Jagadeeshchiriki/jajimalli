import spaSalon from "../images/servicepage/spasalon.png";
import skinLaser from "../images/servicepage/skinlaser.png";
import beautyAcademy from "../images/servicepage/beautyacademy1.png";

export const services = [
  {
    slug: "spa-salon",
    title: "Spa Salon",
    shortTitle: "Spa & Salon",
    tagline: "Relax, rejuvenate & rediscover your glow",
    description: "A restorative collection of spa, hair and beauty rituals designed around the way you want to feel.",
    image: spaSalon,
    offerings: ["Signature spa rituals", "Hair styling & care", "Bridal and occasion makeup", "Nail care & artistry"],
  },
  {
    slug: "skin-laser",
    title: "Skin Laser",
    shortTitle: "Skin & Laser",
    tagline: "Advanced care for healthier, radiant skin",
    description: "Thoughtful skin and laser solutions that combine advanced technology with attentive expert care.",
    image: skinLaser,
    offerings: ["Laser hair reduction", "Skin rejuvenation", "Acne and scar care", "Pigmentation treatments"],
  },
  {
    slug: "beauty-academy",
    title: "Beauty Academy",
    shortTitle: "Beauty Academy",
    tagline: "Learn. Create. Master the art of beauty.",
    description: "Professional, hands-on education created for aspiring artists ready to build skill and confidence.",
    image: beautyAcademy,
    offerings: ["Professional makeup", "Hair styling", "Skin and laser training", "Nail art and care"],
  },
];

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
