"use client"
import { useLocation } from "@/hooks/useLocation"
import { useWeather } from "@/hooks/useWeather"
import { useEffect, useState } from "react"
import { useSubmit } from "@/hooks/useSubmit"

const Forecast = () => {
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
  } = useWeather(city, "forecast")
  useEffect(() => {
    if (location?.city) {
      setCity(location?.city)
    }
  }, [location?.city])
  const [date, setDate] = useState(0)
  const [time, setTime] = useState(0)
  const currentDay = weather?.forecast?.forecastday?.[date]
  const currentHour = currentDay?.hour?.[time]
  const handleSubmit = useSubmit(setCity, setDate)
  return (
    <>
      <section className="titleBlock">
        <h1>Forecast</h1>
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
      <section className="contentBlock forecast">
        <article style={{ "--area": "a" }} className="dataBtns">
          <h1>Date</h1>
          <div className="dateBtns btns">
            {weather?.forecast.forecastday.map((d, i) => (
              <button
                onClick={() => {
                  setDate(i)
                  setTime(0)
                }}
                key={d.date_epoch}
                className={i === date ? "active" : ""}
              >
                {d.date}
              </button>
            ))}
          </div>
        </article>
        <article style={{ "--area": "b" }} className="timeBtns">
          <h1>Time</h1>
          <div className="timeBtns btns">
            {weather?.forecast?.forecastday?.[date].hour.map((t, i) => (
              <button
                onClick={() => {
                  setTime(i)
                }}
                key={t.time_epoch}
                className={i === time ? "active" : ""}
              >
                {t.time?.split(" ")[1] ?? "--:--"}
              </button>
            ))}
          </div>
        </article>
        <article style={{ "--area": "c" }} className="location">
          <h1>Location</h1>
          <div>
            <h2>{weather?.location.country}</h2>
            <h3>{weather?.location.name}</h3>
            <h3>{weather?.current.last_updated}</h3>
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
        <article style={{ "--area": "d" }} className="forecast">
          <h1>Forecast</h1>
          {currentHour && (
            <div>
              <h2>{currentHour.time}</h2>
              <img src={currentHour.condition.icon} />
              <p>
                <span>Weather:</span>
                <span>{currentHour.condition.text}</span>
              </p>
              <p>
                <span>Uv:</span>
                <span>{currentHour.uv}</span>
              </p>
              <hr />
              <h2>Rain</h2>
              <p>
                <span>Daily will it rain:</span>
                <span>{currentHour.will_it_rain ? "Yes" : "No"}</span>
              </p>
              <h2>Snow</h2>
              <p>
                <span>Daily will it snow:</span>
                <span>{currentHour.will_it_snow ? "Yes" : "No"}</span>
              </p>
              <hr />
              <h2>Temperature</h2>
              <p>
                <span>Temp C:</span>
                <span>{currentHour.temp_c}</span>
              </p>
              <p>
                <span>Temp F:</span>
                <span>{currentHour.temp_f}</span>
              </p>
              <hr />
              <h2>Wind</h2>
              <p>
                <span>Wind Direction:</span>
                <span>{currentHour.wind_dir}</span>
              </p>
              <p>
                <span>Wind Mph:</span>
                <span>{currentHour.wind_mph}</span>
              </p>
              <p>
                <span>Wind Kph:</span>
                <span>{currentHour.wind_kph}</span>
              </p>
              <hr />
              <h2>Humidity</h2>
              <p>
                <span>humidity</span>
                <span>{currentHour.humidity}</span>
              </p>
            </div>
          )}
        </article>
      </section>
    </>
  )
}

export default Forecast
