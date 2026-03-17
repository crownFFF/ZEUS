import { NextResponse } from "next/server"

const ALLOW_MODE = new Set([
  "current",
  "forecast",
  "history",
  "alerts",
  "astronomy"
])

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const city = (searchParams.get("city") || "Taipei").trim()
    const modeRaw = (searchParams.get("mode") || "current").trim()
    const mode = ALLOW_MODE.has(modeRaw) ? modeRaw : "current"
    const date = (searchParams.get("dt") || "").trim()

    const key = process.env.WEATHER_TOKEN
    if (!key) {
      return NextResponse.json(
        { error: "missing_weather_token" },
        { status: 500 },
      )
    }

    const params = new URLSearchParams({
      key,
      q: city,
    })

    if (mode === "forecast") {
      params.set("days", "3")
      params.set("aqi", "no")
      params.set("alerts", "no")
    }
    if (mode === "history") {
      if (!date) {
        return NextResponse.json(
          {
            error: "missing_dt",
            message: "history mode requies dt=YYYY-MM-DD",
          },
          { status: 400 },
        )
      }
      params.set("dt", date)
    }

    const url = `https://api.weatherapi.com/v1/${mode}.json?${params.toString()}`

    const res = await fetch(url, { next: { revalidate: 600 } })

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "weather_failed",
          status: res.status,
        },
        { status: 502 },
      )
    }
    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public,s-maxage=600,stale-while-revalidate=86400",
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
