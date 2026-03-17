"use client"
import { useLocation } from "@/hooks/useLocation"
import { useWeather } from "@/hooks/useWeather"
import { useEffect, useState } from "react"
import { useSubmit } from "@/hooks/useSubmit"
const Alerts = () => {
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
  } = useWeather(city, "alerts")
  useEffect(() => {
    if (location?.city) {
      setCity(location?.city)
    }
  }, [location?.city])
  const handleSubmit = useSubmit(setCity)
  const alerts = weather?.alerts?.alert ?? []
  return (
    <>
      <section className="titleBlock">
        <h1>Alerts</h1>
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
      <section className="contentBlock alerts">
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
        <article style={{ "--area": "b" }} className="alerts">
          <h1>Alerts</h1>
          {alerts.length > 0 ? (
            alerts.map((w, i) => (
              <div key={w.identifier ?? 1}>
                <h4>NO.{i + 1}</h4>
                <p>
                  <span>Severity</span>
                  <span>{w.severity}</span>
                </p>
                <p>
                  <span>Areas</span>
                  <span>{w.areas}</span>
                </p>
                <p>
                  <span>Event</span>
                  <span>{w.event}</span>
                </p>
                <p>
                  <span>Effective</span>
                  <span>{w.effective.split("T")[0]}</span>
                </p>
                <p>
                  <span>Expires</span>
                  <span>{w.expires.split("T")[0]}</span>
                </p>
                <hr />
                <h3>Headline</h3>
                <p>{w.headline}</p>
                <hr />
                <h3>Desc</h3>
                <p>{w.desc}</p>
              </div>
            ))
          ) : (
            <p>NOTHING</p>
          )}
        </article>
      </section>
    </>
  )
}
export default Alerts
