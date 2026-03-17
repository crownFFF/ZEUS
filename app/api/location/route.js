import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const res = await fetch(
      `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`,
      { cache: "no-store" },
    )
    if (!res.ok) {
      return NextResponse.json(
        { error: "ipinfo_failed", status: res.status },
        { status: 502 },
      )
    }
    const data = await res.json()
    const [lat, lon] = (data.loc || "").split(",")
    const body = {
      ip: data.ip,
      country: data.country,
      region: data.region,
      city: data.city,
      lat: lat ? Number(lat) : null,
      lon: lon ? Number(lon) : null,
      timezone: data.timezone,
    }

    return new NextResponse(JSON.stringify(body), {
      headers: {
        // 明確告訴瀏覽器 / CDN：這是 JSON
        "Content-Type": "application/json;charset=utf-8",
        /*
        public:CDN / 代理可以快取
        max-age=3600:瀏覽器快取1小時
        s-maxage=3600:CDN（Vercel）快取1小時
        stale-while-revalidate=86400:最多24h內先回舊資料、背景更新
         */
        "Cache-Control":
          "public,max-age=3600,s-maxage=3600,stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "server_exception",
        message: error?.message ?? String(error),
      },
      { status: 500 },
    )
  }
}