import Aside from "@/components/Aside"

export const metadata = {
  title: "WEATHER",
}

export default function RootLayout({ children }) {
  return (
    <>
      <Aside />
      <main className="weather">{children}</main>
    </>
  )
}
