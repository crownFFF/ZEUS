"use client"
import { usePathname } from "next/navigation"
import Gooey from "./Gooey"
import Link from "next/link"

const Aside = () => {
  const path = usePathname().split("/").filter(Boolean)

  return (
    <aside>
      <h1>MODE</h1>
      <ul>
        <li className={path[1] === undefined ? "active" : ""}>
          <Link href="/Weather">Realtime</Link>
          {path[1] === undefined && <Gooey />}
        </li>
        <li className={path[1] === "Forecast" ? "active" : ""}>
          <Link href="/Weather/Forecast">Forecast</Link>
          {path[1] === "Forecast" && <Gooey />}
        </li>
        <li className={path[1] === "History" ? "active" : ""}>
          <Link href="/Weather/History">History</Link>
          {path[1] === "History" && <Gooey />}
        </li>
        <li className={path[1] === "Alerts" ? "active" : ""}>
          <Link href="/Weather/Alerts">Alerts</Link>
          {path[1] === "Alerts" && <Gooey />}
        </li>
        <li className={path[1] === "Astronomy" ? "active" : ""}>
          <Link href="/Weather/Astronomy">Astronomy</Link>
          {path[1] === "Astronomy" && <Gooey />}
        </li>
      </ul>
    </aside>
  )
}

export default Aside
