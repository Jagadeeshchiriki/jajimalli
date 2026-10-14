import ServiceDetailPage from "../components/ServiceDetailPage";
import { getService } from "../serviceData";
import { seoKeywords } from "../../seoKeywords";

const service = getService("skin-laser");

export const metadata = {
  title: "Skin & Laser Treatments in Visakhapatnam & Tanuku",
  description: "Advanced skin and laser treatments in Visakhapatnam and Tanuku, including laser hair reduction, HydraFacial, electrolysis and chemical peels.",
  keywords: seoKeywords.skinLaser,
  alternates: {
    canonical: "/services/skin-laser/",
  },
};

export default function SkinLaserPage() {
  return <ServiceDetailPage service={service} />;
}
