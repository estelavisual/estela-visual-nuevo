import styles from './WhatsAppButton.module.css'

const WA_URL = 'https://wa.me/5492246592370'

export default function WhatsAppButton() {
  return (
    <a className={styles.btn} href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp">
      <span className={styles.label}>Escribinos</span>
      <span className={styles.shutter} aria-hidden="true">
        <i />
        <svg className={styles.icon} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="waGrad" x1="6" y1="4" x2="26" y2="29" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4a3a1c" />
              <stop offset="1" stopColor="#140f08" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waGrad)"
            d="M16.02 3C9.4 3 4 8.38 4 15c0 2.37.68 4.58 1.86 6.45L4 29l7.74-1.82A11.9 11.9 0 0 0 16.02 27C22.65 27 28 21.62 28 15S22.65 3 16.02 3Zm0 21.8a9.7 9.7 0 0 1-4.95-1.36l-.36-.21-4.6 1.08 1.1-4.48-.24-.37A9.7 9.7 0 1 1 25.75 15a9.7 9.7 0 0 1-9.73 9.8Zm5.33-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.35Z"
          />
        </svg>
      </span>
    </a>
  )
}
