import Link from "next/link";
import { ArrowIcon, FloralMark, PetalIcon } from "../components/Icons";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero shell about-hero">
        <div><p className="eyebrow"><span /> Our story</p><h1>Beauty, found<br />in the <em>in-between.</em></h1></div>
        <p>Jajimalli is a floral studio devoted to natural movement, meaningful detail, and the quiet poetry of flowers.</p>
      </section>
      <section className="about-canvas shell">
        <div className="about-art"><span className="big-letter">J</span><FloralMark /></div>
        <div className="about-copy">
          <div className="section-label"><span>01</span> How we began</div>
          <h2>A love letter to<br /><em>the natural world.</em></h2>
          <p>Jajimalli began with a simple belief: flowers should feel alive. Not overly arranged or perfectly polished, but full of gesture, fragrance, and the character of the season.</p>
          <p>Our name is inspired by the jasmine flower—small, soulful, and unforgettable. That same spirit guides everything we make: understated beauty with a lasting presence.</p>
        </div>
      </section>
      <section className="values-section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow"><span /> What guides us</p><h2>Our way of <em>working.</em></h2></div></div>
          <div className="values-grid">
            <article><span>01</span><PetalIcon /><h3>Season first</h3><p>We follow nature&apos;s rhythm, choosing what is expressive, abundant, and beautiful right now.</p></article>
            <article><span>02</span><PetalIcon /><h3>Made personal</h3><p>We listen closely, then translate your story into flowers that could only belong to you.</p></article>
            <article><span>03</span><PetalIcon /><h3>Tread lightly</h3><p>We source thoughtfully, avoid unnecessary waste, and reuse mechanics wherever we can.</p></article>
          </div>
        </div>
      </section>
      <section className="founder-section shell">
        <div className="founder-copy">
          <p className="eyebrow"><span /> Behind the stems</p><h2>Led by instinct.<br />Made by <em>hand.</em></h2>
          <p>We&apos;re a small, close-knit studio of floral designers and dreamers. Our work is tactile and intuitive—built stem by stem, with room for each flower to move.</p>
          <Link className="button button-dark" href="/services">Discover our services <ArrowIcon /></Link>
        </div>
        <div className="founder-art"><div className="vase"><i /><i /><i /><i /><i /></div><span>Est. with love<br />and a pair of shears</span></div>
      </section>
    </main>
  );
}
