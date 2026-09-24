import Link from "next/link";
import { ArrowIcon, PetalIcon } from "./Icons";

const links = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }];

export function Header() {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Jajimalli home"><PetalIcon /><span>Jajimalli</span><small>Floral Studio</small></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
      <a className="header-contact" href="mailto:hello@jajimalli.com">Let&apos;s talk <ArrowIcon /></a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><i /><i /></summary>
        <nav>{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
      </details>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand"><Link className="brand brand-light" href="/"><PetalIcon /><span>Jajimalli</span><small>Floral Studio</small></Link><p>Wildly beautiful flowers,<br />made with meaning.</p></div>
        <div className="footer-links"><p>Explore</p>{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        <div className="footer-links"><p>Connect</p><a href="mailto:hello@jajimalli.com">Email</a><a href="#instagram">Instagram</a><a href="#pinterest">Pinterest</a></div>
        <div className="footer-note"><PetalIcon /><span>Made slowly,<br />with heart.</span></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Jajimalli Floral Studio</span><span>Flowers · Feeling · Form</span></div>
    </footer>
  );
}
