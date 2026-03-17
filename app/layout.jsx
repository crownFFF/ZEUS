import Header from "./components/Header"
import "./scss/style.scss"

import { BBH_Sans_Hegarty, Noto_Sans } from "next/font/google"

export const metadata = {
  title: {
    template: "ZEUS | %s",
    default: "ZEUS",
  },
  description: "即時天氣查詢網站，提供城市天氣與預測資訊",
  keywords: ["weather", "forecast", "天氣", "Next.js weather app"],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: 'origin-when-cross-origin',
  applicationName: 'ZEUS | Weather App',
  authors:[{name:"Tomy"}],
  creator:"Tomy",
  publisher:"Tomy"
}
const noto = Noto_Sans({
  subsets: ["latin"],
  weight: "400",
  preload: true,
  style: "normal",
  variable: "--noto",
  fallback: [],
})
const bbh = BBH_Sans_Hegarty({
  subsets: ["latin"],
  weight: "400",
  preload: true,
  style: "normal",
  fallback: ["var(--noto)", "arial"],
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bbh.className} ${noto.variable} scroll-container`}
    >
      <body>
        <svg>
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation={10} />
              <feColorMatrix
                values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10
              "
              />
            </filter>
          </defs>
        </svg>
        <Header />
        {children}
      </body>
    </html>
  )
}
