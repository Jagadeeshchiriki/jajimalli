import ServiceDetailPage from "../components/ServiceDetailPage";
import { getService } from "../serviceData";
import { seoKeywords } from "../../seoKeywords";

const service = getService("spa-salon");

export const metadata = {
  title: "Spa & Beauty Salon in Visakhapatnam & Tanuku",
  description: "Spa and salon in Visakhapatnam and Tanuku for bridal makeup, hair care, saree draping, nails, facials and beauty rituals.",
  keywords: seoKeywords.spaSalon,
  alternates: {
    canonical: "/services/spa-salon/",
  },
};

export default function SpaSalonPage() {
  return <ServiceDetailPage service={service} />;
}
