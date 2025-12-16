import Link from 'next/link'

export default function Header() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="../../dashboard/page">Dashboard</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}