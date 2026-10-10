import ServiceDetailPage from "../components/ServiceDetailPage";
import { getService } from "../serviceData";

const service = getService("spa-salon");

export const metadata = {
  title: service.shortTitle,
  description: service.description,
};

export default function SpaSalonPage() {
  return <ServiceDetailPage service={service} />;
}
