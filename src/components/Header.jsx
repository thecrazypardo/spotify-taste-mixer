import Link from 'next/link'
import Image from "next/image";

export default function Header() {
  return (
    <nav className='flex items-center w-screen h-20 space-x-6 px-8 bg-black shadow-xl'>
      
      <Link href="/" className='text-lg font-medium tracking-wider text-white hover:text-green-400 transition duration-300'>Home</Link>
      <Link href="/dashboard" className='text-lg font-medium text-white hover:text-green-400 transition duration-300'>Dashboard</Link>
      <Link href="/about" className='text-lg font-medium text-white hover:text-green-400 transition duration-300'>About</Link>
      
      <div className="ml-auto">
        <Image
          src="/vercel.svg"
          alt="Profile?"
          width={50}
          height={50}
          priority
        />
      </div>

    </nav>
  )
}