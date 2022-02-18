import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/kanda">
          <a>Enter</a>
      </Link>
    </div>
  )
}
