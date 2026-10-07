import spaSalon from "../images/servicepage/spasalon.png";
import skinLaser from "../images/servicepage/skinlaser.png";
import beautyAcademy from "../images/servicepage/beautyacademy1.png";
import microblading from "../images/servicepage/microblading.png";
import hydraFacial from "../images/servicepage/hydrafacial.png";
import bridalMakeup from "../images/homepage/bridalmakeup.png";
import lipBlush from "../images/servicepage/Lip_blush.jpg";
import liceTreatment from "../images/servicepage/lice-treatment.png";
import nanoplastia from "../images/servicepage/nanoplastia.png";
import facial from "../images/servicepage/facial.png";
import sareeDraping from "../images/servicepage/sareedraping.png";
import hairCut from "../images/servicepage/haircut.png";
import hairExtensions from "../images/servicepage/hairextentions.png";
import hairStyle from "../images/servicepage/hairstyle.png";
import Mehndi from "../images/servicepage/mehndi.webp";
import electrolysis from "../images/servicepage/Electrolysis.png";
import chemicalPeel from "../images/servicepage/chemical.png";
import academyHair from "../images/servicepage/hairstyle.png";
import academyNails from "../images/servicepage/nailart1.png";
import professionalMakeup from "../images/servicepage/professionalmakeup1.png";
import prp from "../images/servicepage/prp-treatment.png";
import gfc from "../images/servicepage/gfc.png";
import dpn from "../images/servicepage/dpn.png";


export const services = [
  {
    slug: "spa-salon",
    title: "Spa Salon",
    shortTitle: "Spa Salon",
    tagline: "Relax, rejuvenate & rediscover your glow",
    description: "A restorative collection of spa, hair and beauty rituals designed around the way you want to feel.",
    offeringsTitle: "Signature Beauty & Salon Treatments",
    image: spaSalon,
    offerings: [
      { title: "Microblading", image: microblading, description: "Precision brow artistry shaped to complement your natural features.", supporting: "Tailored mapping · Natural-looking definition" },
      { title: "Bridal Makeup", image: bridalMakeup, description: "Refined bridal artistry designed around your features, attire and celebration.", supporting: "Personal consultation · Long-wear finish" },
      { title: "Lip Blush", image: lipBlush, description: "Soft, balanced lip colour that enhances shape while retaining a natural finish.", supporting: "Custom tone · Delicate definition" },
      { title: "Lice Treatment", image: liceTreatment, description: "Careful scalp and hair treatment delivered with comfort and discretion.", supporting: "Thorough care · Gentle process" },
      { title: "Nanoplastia", image: nanoplastia, description: "A smoothing hair ritual created for polished movement, softness and shine.", supporting: "Frizz control · Silky finish" },
      { title: "Facials", image: facial, description: "Personalised facial rituals selected for your skin's changing needs.", supporting: "Expert assessment · Restorative care" },
      { title: "Saree Draping & Pre-Pleating", image: sareeDraping, description: "Elegant, secure draping prepared for effortless movement and a flawless silhouette.", supporting: "Occasion styling · Ready-to-wear pleats" },
      { title: "Hair Cuts", image: hairCut, description: "Considered cuts shaped around your texture, lifestyle and personal style.", supporting: "Consultation · Precision shaping" },
      { title: "Hair Extensions", image: hairExtensions, description: "Seamlessly blended length and volume with a natural, comfortable finish.", supporting: "Custom matching · Expert placement" },
      { title: "Hair Styles", image: hairStyle, description: "Modern styling and occasion-ready looks shaped with lasting polish.", supporting: "Everyday finish · Event styling" },
      { title: "Mehndi", image: Mehndi, description: "Intricate traditional and contemporary designs created with a fine artistic hand.", supporting: "Bridal · Festive · Bespoke" },
    ],
  },
  {
    slug: "skin-laser",
    title: "Skin Lasers",
    shortTitle: "Skin Lasers",
    tagline: "Advanced care for healthier, radiant skin",
    description: "Thoughtful skin and laser solutions that combine advanced technology with attentive expert care.",
    offeringsTitle: "Advanced Skin Lasers Treatments",
    image: skinLaser,
    offerings: [
      { title: "Laser Hair Removal", image: skinLaser, description: "Technology-led hair reduction planned around your skin and treatment goals.", supporting: "Personal plan · Expert-led sessions" },
      { title: "Electrolysis Hair Removal", image: electrolysis, description: "Targeted permanent hair removal for precise, individual treatment areas.", supporting: "Fine precision · All skin tones" },
      { title: "Hydra Facial", image: hydraFacial, description: "A deeply cleansing and hydrating ritual for fresh, luminous skin.", supporting: "Cleanse · Exfoliate · Hydrate" },
      { title: "Chemical Peel", image: chemicalPeel, description: "A professional resurfacing treatment selected to renew clarity and texture.", supporting: "Skin assessment · Controlled renewal" },
      {title: "PRP Treatment", image: prp, description: "A regenerative treatment using platelet-rich plasma to support healthier, fuller-looking hair and skin.",supporting: "Regenerative care · Expert-led treatment" },
      {title: "GFC Treatment", image: gfc, description: "A growth-factor treatment designed to support hair regeneration and improve overall scalp health.",supporting: "Growth factors · Scalp rejuvenation"},
      {title: "DPN Treatment", image: dpn, description: "A precise skin treatment designed to safely reduce and remove small benign skin growths and spots.",supporting: "Precise treatment · Professional care" },
    ],
  },
  {
    slug: "beauty-academy",
    title: "Beauty Academy",
    shortTitle: "Beauty Academy",
    tagline: "Learn. Create. Master the art of beauty.",
    description: "Professional, hands-on education created for aspiring artists ready to build skill and confidence.",
    offeringsTitle: "Professional Beauty Courses",
    image: beautyAcademy,
    offerings: [
      { title: "Professional Makeup", image: professionalMakeup, description: "Build confident technique across complexion, colour and occasion artistry.", supporting: "Demonstration · Guided practice" },
      { title: "Hair Styling", image: academyHair, description: "Learn foundational and advanced styling through practical salon-led training.", supporting: "Technique · Form · Finish" },
      { title: "Nail Art & Care", image: academyNails, description: "Master neat preparation, lasting finishes and expressive nail artistry.", supporting: "Care fundamentals · Creative design" },
    ],
  },
];

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}
