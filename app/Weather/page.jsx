"use client"
import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import { useLocation } from "@/hooks/useLocation"
import { useWeather } from "@/hooks/useWeather"
import { useSubmit } from "@/hooks/useSubmit"
import { two_temp as option } from "@/lib/charts"

const Weather = () => {
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
  } = useWeather(city)
  useEffect(() => {
    if (location?.city) {
      setCity(location?.city)
    }
  }, [location?.city])

  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  useEffect(() => {
    if (!chartRef.current) return
    chartInstanceRef.current = echarts.init(chartRef.current)
    chartInstanceRef.current.setOption(option)
    return () => {
      chartInstanceRef.current.dispose()
    }
  }, [])
  useEffect(() => {
    const charts = chartInstanceRef.current
    if (!charts) return
    const temp_c = Number(weather?.current?.temp_c)
    const temp_f = Number(weather?.current?.temp_f)
    if (!Number.isFinite(temp_c) && !Number.isFinite(temp_f)) return
    charts.setOption({
      series: [
        { data: [{ value: temp_c }] },
        { data: [{ value: temp_c }] },
        { data: [{ value: temp_f }] },
        { data: [{ value: temp_f }] },
      ],
    })
    const handleResize = () => {
      chartInstanceRef.current.resize()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [weather])
  const handleSubmit = useSubmit(setCity)
  return (
    <>
      <section className="titleBlock">
        <h1>Realtime</h1>
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
      <section className="contentBlock realtime">
        <article style={{ "--area": "a" }} className="location">
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
        <article style={{ "--area": "b" }} className="temp">
          <h1>Temperature</h1>
          <div>
            <p>
              <span>Temp C</span>
              <span>{weather?.current.temp_c}</span>
            </p>
            <p>
              <span>Temp F</span>
              <span>{weather?.current.temp_f}</span>
            </p>
            <p>
              <span>Feelslike C</span>
              <span>{weather?.current.feelslike_c}</span>
            </p>
            <p>
              <span>Feelslike F</span>
              <span>{weather?.current.feelslike_f}</span>
            </p>
          </div>
          <div className="charts temp" ref={chartRef} />
        </article>
        <article style={{ "--area": "c" }} className="day">
          <h1>Day</h1>
          <div>
            <p>
              <span>Cloud:</span>
              <span>{weather?.current.cloud}</span>
            </p>
            <p>
              <span>Weather:</span>
              <span>{weather?.current.condition.text}</span>
            </p>
            <p>
              <span>Uv:</span>
              <span>{weather?.current.uv}</span>
            </p>
            <img src={weather?.current.condition.icon} />
          </div>
        </article>
        <article style={{ "--area": "d" }} className="wind">
          <h1>Wind</h1>
          <div>
            <p>
              <span>Wind mph</span>
              <span>{weather?.current.wind_mph}</span>
            </p>
            <p>
              <span>Wind kph</span>
              <span>{weather?.current.wind_kph}</span>
            </p>
            <p>
              <span>Wind degree</span>
              <span>{weather?.current.wind_degree}</span>
            </p>
            <p>
              <span>Wind dir</span>
              <span>{weather?.current.wind_dir}</span>
            </p>
            <p>
              <span>Gust kph</span>
              <span>{weather?.current.gust_mph}</span>
            </p>
            <p>
              <span>Gust mph</span>
              <span>{weather?.current.gust_kph}</span>
            </p>
          </div>
        </article>
        <article style={{ "--area": "e" }} className="humidity">
          <h1>Humidity</h1>
          <div className="humidity">
            <div style={{ "--t": weather?.current.humidity || "0" }} />
            <p>RH {weather?.current.humidity || "0"}%</p>
          </div>
        </article>
      </section>
    </>
  )
}

export default Weather
