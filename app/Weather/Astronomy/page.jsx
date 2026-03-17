"use client"
import { useLocation } from "@/hooks/useLocation"
import { useWeather } from "@/hooks/useWeather"
import { useEffect, useState } from "react"
import { useSubmit } from "@/hooks/useSubmit"
// moon
import Image from "next/image"
import { moonPhases } from "@/lib/moonPhases"

const Astronomy = () => {
  const {
    data: location,
    error: locError,
    isLoading: locLoading,
  } = useLocation()
  const [city, setCity] = useState(null)
  const {
    data: weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(city, "astronomy")
  useEffect(() => {
    if (location?.city) {
      setCity(location?.city)
    }
  }, [location?.city])
  const handleSubmit = useSubmit(setCity)
  const moon_phase = weather?.astronomy?.astro?.moon_phase
    ?.replace(/\s+/g, "")
    ?.toLowerCase()
  return (
    <>
      <section className="titleBlock">
        <h1>Astronomy</h1>
        <form name="location" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="搜尋位置(請輸入英文)"
            id="city"
            name="city"
            required
          />
          <button type="submit">搜尋</button>
        </form>
      </section>
      <section className="contentBlock astronomy">
        <article style={{ "--area": "a" }} className="location">
          <h1>Location</h1>
          <div>
            <h2>{weather?.location.country}</h2>
            <h3>{weather?.location.name}</h3>
            <h3>{weather?.location.localtime}</h3>
            <p>
              <span>Time Zone:</span>
              <span>{weather?.location.tz_id}</span>
            </p>
            <p>
              <span>Region:</span>
              <span>{weather?.location.region}</span>
            </p>
            <p>
              <span>Latitude:</span>
              <span>{weather?.location.lat}</span>
            </p>
            <p>
              <span>Longitude:</span>
              <span>{weather?.location.lon}</span>
            </p>
          </div>
        </article>
        <article style={{ "--area": "b" }} className="astronomy">
          <h1>Astronomy</h1>
          <div>
            <p>
              <span>Sunrise</span>
              <span>{weather?.astronomy.astro.sunrise}</span>
            </p>
            <p>
              <span>Sunset</span>
              <span>{weather?.astronomy.astro.sunset}</span>
            </p>
            <p>
              <span>Moonrise</span>
              <span>{weather?.astronomy.astro.moonrise}</span>
            </p>
            <p>
              <span>Moonset</span>
              <span>{weather?.astronomy.astro.moonset}</span>
            </p>
            <p>
              <span>Moon Phase</span>
              <span>{weather?.astronomy.astro.moon_phase}</span>
            </p>
          </div>
        </article>
        <article style={{ "--area": "c" }} className="moonPhase">
          <h1>Moon Phase</h1>
          <div>
            {moonPhases.map((moon,index) => (
              <Image
                src={moon.src}
                alt={moon.label}
                title={moon.label}
                key={moon.key}
                className={moon_phase === moon.key ? "active" : ""}
                style={{"--area":`m${index + 1}`}}
              />
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default Astronomy
