import Header from "../components/homepage/Header";
import Footer from "../components/homepage/Footer";

export default function ServicesLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
