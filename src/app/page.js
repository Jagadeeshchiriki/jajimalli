import Link from "next/link";
import { ArrowIcon, FloralMark, PetalIcon, SparkIcon } from "./components/Icons";

const services = [
  { number: "01", title: "Wedding florals", text: "From intimate vows to grand celebrations, every bloom is chosen to carry your story." },
  { number: "02", title: "Event styling", text: "Thoughtful floral worlds for gatherings, launches, dinners, and moments worth remembering." },
  { number: "03", title: "Everyday flowers", text: "Season-led arrangements, hand-tied and delivered with care for the beautiful ordinary." },
];

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Floral stories, thoughtfully told</p>
          <h1>Where flowers<br />become <em>feeling.</em></h1>
          <p className="hero-intro">Season-led florals, artfully arranged for weddings, gatherings, and the quiet moments in between.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/services">Explore our work <ArrowIcon /></Link>
            <Link className="text-link" href="/about">Our story <ArrowIcon /></Link>
          </div>
        </div>
        <div className="hero-art reveal reveal-late" aria-label="Abstract floral composition">
          <div className="sun-disc" /><div className="arch-frame" /><FloralMark className="hero-flower" />
          <span className="art-note">Rooted in season<br />&amp; sentiment</span>
        </div>
      </section>
      <section className="marquee" aria-label="Our values">
        <div>Natural beauty <PetalIcon /> Quiet luxury <PetalIcon /> Made with meaning <PetalIcon /> Natural beauty <PetalIcon /> Quiet luxury</div>
      </section>
      <section className="intro-section shell">
        <div className="section-label"><span>01</span> Our approach</div>
        <div className="intro-content">
          <h2>Flowers that feel<br /><em>like you.</em></h2>
          <div>
            <p>We believe the most beautiful arrangements feel unforced—full of movement, texture, and a little wildness. No two stories are the same, and neither are our flowers.</p>
            <Link className="text-link" href="/about">Meet the studio <ArrowIcon /></Link>
          </div>
        </div>
      </section>
      <section className="services-preview shell">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> What we create</p><h2>For life&apos;s <em>lovely</em> moments.</h2></div>
          <Link className="button button-outline" href="/services">View all services <ArrowIcon /></Link>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card card-${index + 1}`} key={service.title}>
              <div className="service-visual"><SparkIcon /></div>
              <div className="service-body">
                <span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p>
                <Link aria-label={`Learn about ${service.title}`} href="/services"><ArrowIcon /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="quote-band"><PetalIcon /><blockquote>“There are always flowers<br />for those who want to see them.”</blockquote><p>— Henri Matisse</p></section>
      <section className="cta-section shell">
        <div><p className="eyebrow"><span /> Let&apos;s make something beautiful</p><h2>Have a moment<br />in mind?</h2></div>
        <p>Tell us a little about what you&apos;re dreaming of, and we&apos;ll take it from there.</p>
        <a className="round-link" href="mailto:hello@jajimalli.com"><ArrowIcon /><span>Start a<br />conversation</span></a>
      </section>
    </main>
  );
}
