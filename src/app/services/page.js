import { ArrowIcon, PetalIcon, SparkIcon } from "../components/Icons";

export const metadata = { title: "Services" };

const offerings = [
  { n: "01", title: "Weddings", kicker: "Your day, in bloom", text: "Floral design that feels unmistakably yours—from a single bridal bouquet to the full ceremony and reception story.", list: ["Personal flowers", "Ceremony installations", "Reception tablescapes", "On-site styling"] },
  { n: "02", title: "Events", kicker: "Gather beautifully", text: "Expressive, atmosphere-shaping florals for intimate dinners, brand moments, milestones, and celebrations of every kind.", list: ["Creative direction", "Floral installations", "Tablescape styling", "Delivery & setup"] },
  { n: "03", title: "Everyday", kicker: "A little wonder", text: "Loose, season-led flowers for homes, thoughtful gifts, and the simple pleasure of having something beautiful nearby.", list: ["Hand-tied bouquets", "Vase arrangements", "Weekly subscriptions", "Local delivery"] },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero shell services-hero">
        <div><p className="eyebrow"><span /> Our services</p><h1>Flowers for<br /><em>every chapter.</em></h1></div>
        <p>From once-in-a-lifetime celebrations to just-because gestures, we create flowers that turn a moment into a memory.</p>
      </section>
      <section className="offerings shell">
        {offerings.map((item, index) => (
          <article className="offering" key={item.title}>
            <div className={`offering-art offering-art-${index + 1}`}><span>{item.n}</span><SparkIcon /><PetalIcon /></div>
            <div className="offering-copy">
              <p className="eyebrow"><span /> {item.kicker}</p><h2>{item.title}</h2><p>{item.text}</p>
              <ul>{item.list.map((detail) => <li key={detail}><PetalIcon />{detail}</li>)}</ul>
              <a className="text-link" href="mailto:hello@jajimalli.com">Enquire now <ArrowIcon /></a>
            </div>
          </article>
        ))}
      </section>
      <section className="process-section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow"><span /> The process</p><h2>From first thought<br />to <em>final stem.</em></h2></div><p>Warm, collaborative, and considered from start to finish.</p></div>
          <div className="process-grid">
            <article><span>01</span><h3>We listen</h3><p>Share the feeling, the place, and the moments that matter most.</p></article>
            <article><span>02</span><h3>We imagine</h3><p>We shape a floral direction around your story, season, and setting.</p></article>
            <article><span>03</span><h3>We create</h3><p>Every element is made by hand, with detail, movement, and care.</p></article>
          </div>
        </div>
      </section>
      <section className="service-cta shell">
        <PetalIcon /><p>Something else in mind?</p><h2>We&apos;d love to hear<br />what you&apos;re <em>dreaming up.</em></h2>
        <a className="button button-dark" href="mailto:hello@jajimalli.com">Tell us about it <ArrowIcon /></a>
      </section>
    </main>
  );
}
