"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Drip from "./Drip"

const Header = () => {
  const path = usePathname()
  const page = path.split("/").filter(Boolean)
  if (!page[0]) return
  return (
    <header className={page[0] === "Home" ? "animation" : ""}>
      <Drip background={"/background.jpg"}/>
      <nav>
        <Link href="/Home" className={page[0] === "Home" ? "active" : ""}>
          Home
        </Link>
        <Link href="/Weather" className={page[0] === "Weather" ? "active" : ""}>
          Weather
        </Link>
      </nav>
      <section className="title">ZEUS</section>
      <nav>
        <Link href="/About" className={page[0] === "About" ? "active" : ""}>
          About
        </Link>
        <Link href="/Project" className={page[0] === "Project" ? "active" : ""}>
          Project
        </Link>
      </nav>
    </header>
  )
}


export default Header
