import styles from './WhatsAppButton.module.css'

const WA_URL = 'https://wa.me/5492246592370'

export default function WhatsAppButton() {
  return (
    <a className={styles.btn} href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp">
      <span className={styles.label}>Escribinos</span>
      <span className={styles.shutter} aria-hidden="true"><i /></span>
    </a>
  )
}
