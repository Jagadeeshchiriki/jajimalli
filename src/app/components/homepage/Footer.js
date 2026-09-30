import Brand from "./Brand";
import styles from "./FooterLayout.module.css";

function PinIcon() {
  return <svg className={styles.pinIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
}

function PhoneIcon() {
  return (
    <svg className={styles.phoneIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.1 3.5 4.7 5.9c-.8.8-.5 3.5 2.5 7.3s6.6 6.7 9.2 6.1l2.7-2.7-4-3-2.1 2.1c-1.4-.7-3.8-3-4.6-4.6L10.3 9 7.1 3.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Instagram">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className={styles.socialIconDot} cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="YouTube">
      <path d="M21 8.1a3 3 0 0 0-2.1-2.2C17.1 5.4 12 5.4 12 5.4s-5.1 0-6.9.5A3 3 0 0 0 3 8.1 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.9a3 3 0 0 0 2.1 2.2c1.8.5 6.9.5 6.9.5s5.1 0 6.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .4-3.9 31 31 0 0 0-.4-3.9Z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brandWrap}><Brand /><p>Beauty Beyond Occasions</p></div>
        <div className={styles.location}><PinIcon /><h3>Location 1</h3><p>Chatrapati Rd, Opp Bean Board, BS Layout,<br />Seethammadhara, Vizag</p><a href="tel:+917093244555"><PhoneIcon /><span>+91 70932 44555</span></a></div>
        <div className={styles.location}><PinIcon /><h3>Location 2</h3><p>Below Srinivasa Skin Hospital,<br />Rastrapathi Road, Tuni</p><a href="tel:+910000000000"><PhoneIcon /><span>+91 00000 00000</span></a></div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Jajimalli. All Rights Reserved</span>
        <span className={styles.socials}><InstagramIcon /><YouTubeIcon /></span>
      </div>
    </footer>
  );
}
