"use client"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "@/hooks/useLocation"
import { useWeather } from "@/hooks/useWeather"
import { useSubmit } from "@/hooks/useSubmit"

const History = () => {
  // date
  const dateObj = useMemo(() => {
    const format = d => {
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const dd = String(d.getDate()).padStart(2, "0")
      return `${yyyy}-${mm}-${dd}`
    }
    const todayDate = new Date()
    const minDateObj = new Date()
    minDateObj.setDate(minDateObj.getDate() - 8)
    return {
      today: format(todayDate),
      minDate: format(minDateObj),
    }
  }, [])
  // localtion
  const {
    data: location,
    error: locError,
    isLoading: locLoading,
  } = useLocation()
  const [city, setCity] = useState(null)
  const [date, setDate] = useState(dateObj.today)
  const {
    data: weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(city, "history", date)
  useEffect(() => {
    if (location?.city) {
      setCity(location?.city)
    }
  }, [location?.city])
  const [time, setTime] = useState(0)
  const currentDay = weather?.forecast?.forecastday?.[0]
  const currentHour = currentDay?.hour?.[time]
  const handleSubmit = useSubmit(setCity, setDate)
  return (
    <>
      <section className="titleBlock">
        <h1>History</h1>
        <form name="location" onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={dateObj.today}
            min={dateObj.minDate}
            max={dateObj.today}
          />
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
      <section className="contentBlock history">
        <article style={{ "--area": "a" }} className="timeBtns">
          <h1>Time</h1>
          <div className="timeBtns btns">
            {weather?.forecast?.forecastday?.[0].hour.map((t, i) => (
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
        <article style={{ "--area": "b" }} className="location">
          <h1>Location</h1>
          <div>
            <h2>{weather?.location.country}</h2>
            <h3>{weather?.location.name}</h3>
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
        <article style={{ "--area": "c" }} className="history">
          <h1>History</h1>
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

export default History
