import ServiceDetailPage from "../components/ServiceDetailPage";
import { getService } from "../serviceData";

const service = getService("skin-laser");

export const metadata = {
  title: service.shortTitle,
  description: service.description,
};

export default function SkinLaserPage() {
  return <ServiceDetailPage service={service} />;
}
