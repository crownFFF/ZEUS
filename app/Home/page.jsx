"use client"
import { useCallback, useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { wrapGrid } from "animate-css-grid"
// components
import Gooey from "@/components/Gooey"
// hook
import { useWeather } from "@/hooks/useWeather"
import { useLocation } from "@/hooks/useLocation"
import { useSubmit } from "@/hooks/useSubmit"
// img
import temperatureImg from "@/assets/home/temperature.jpg"
import weatherImg from "@/assets/home/weather.jpg"
import locationImg from "@/assets/home/location.jpg"
// chart
import * as echarts from "echarts"
import { one_temp as option } from "@/lib/charts"
// anime
import { animate, createScope, onScroll } from "animejs"

export default function Home() {
  // Location api
  const {
    data: location,
    error: locError,
    isLoading: locLoading,
  } = useLocation()
  const [city, setCity] = useState(null)
  // Weather api
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
  // card effect
  const handleMove = useCallback(e => {
    const card = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - card.left) / card.width
    const x = ((pos - 0.5) * 50).toFixed(2)
    e.currentTarget.style.setProperty("--per", `${x}%`)
  }, [])
  // Submit
  const handleSubmit = useSubmit(setCity)
  // chart
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
    const temp = Number(weather?.current?.temp_c)
    if (!Number.isFinite(temp)) return
    charts.setOption({
      series: [{ data: [{ value: temp }] }, { data: [{ value: temp }] }],
    })
    const handleResize = ()=>{
      chartInstanceRef.current.resize()
    }
    window.addEventListener("resize",handleResize)
    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  }, [weather])
  // grid
  const grid = useRef(null)
  const [gridState, setGridState] = useState("s1")
  useEffect(() => {
    const unwrap = wrapGrid(grid.current, {
      duration: 350,
      easing: "easeInOut",
      stagger: 8,
    })
    return () => {
      if (typeof unwrap === "function") unwrap()
    }
  }, [])
  // anime
  const root = useRef(null)
  const scope = useRef(null)
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      animate(".story", {
        opacity: [
          {
            from: 0,
            ease: "inBack",
          },
        ],
        autoplay: onScroll({
          container: ".scroll-container",
          enter: "100% top",
          leave: "80% bottom",
          target: ".story",
          sync: true,
        }),
      })
      animate(".location", {
        opacity: [
          {
            from: 0,
            ease: "inBack",
          },
        ],
        autoplay: onScroll({
          container: ".scroll-container",
          enter: "100% top",
          leave: "80% bottom",
          target: ".location",
          sync: true,
        }),
      })
    })
    return () => scope.current.revert()
  }, [])
  return (
    <main className="home" ref={root}>
      <article style={{ "--area": "a" }} className="story">
        <h1>Side Project Story</h1>
        <p>這份作品 主要以天氣API作為核心</p>
        <p>
          將主要的學習目標聚焦於 ServerComponents 與 ClientComponents的責任劃分
        </p>
        <p>同時透過 Bento Grid 的排版設計以及搭配 RWD</p>
        <p>以維持清楚的視覺層級以及閱讀節奏</p>
        <p className="hashtag">
          <span>Sass/Scss</span>
          <span>Next.js</span>
          <span>AppRouter</span>
          <span>WeatherAPI</span>
          <span>SideProject</span>
        </p>
      </article>
      <article style={{ "--area": "b" }} className="location">
        {locLoading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          <h1>{weather?.location.name}</h1>
        )}
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
      </article>
      <article
        style={{ "--area": "d" }}
        className="weather background"
        onMouseMove={handleMove}
      >
        {weatherLoading ? (
          <h1 className="loading">LOADING</h1>
        ) : (
          <h1>
            <span>{weather?.location.country}</span>
            <span>{weather?.location.name}</span>
          </h1>
        )}
        <p className="date">{weather?.location.localtime}</p>
        <div className="condition">
          <img
            src={weather?.current.condition.icon}
            alt={weather?.current.condition.text}
          />
          <p>{weather?.current.condition.text}</p>
        </div>
        <section className="detail">
          <div className="humidity">
            <div style={{ "--t": weather?.current.humidity || "0" }} />
            <p>RH {weather?.current.humidity || "0"}%</p>
          </div>
          <div className="charts temp" ref={chartRef} />
        </section>
      </article>
      <article
        style={{ "--area": "e" }}
        className={`highlights background ${gridState}`}
        onMouseMove={handleMove}
        ref={grid}
      >
        <h1>Highlights</h1>
        <ul className="s1" style={{ "--area": "s1" }}>
          <div>
            <li className="title ">Temperature｜溫度</li>
            <li className="subTitle">即時掌握當前與體感溫度</li>
            <li className="info">顯示目前溫度、體感溫度以及今日最高與最低溫</li>
            <li className="img">
              <Image src={temperatureImg} alt="temperature" preload />
            </li>
            <li
              className="showBtn"
              onClick={() => {
                setGridState("s1")
              }}
            >
              show
              <Gooey />
            </li>
          </div>
        </ul>
        <ul className="s2" style={{ "--area": "s2" }}>
          <div>
            <li className="title ">Weather｜天氣狀況</li>
            <li className="subTitle">快速了解目前天氣型態</li>
            <li className="info">包含天氣描述、降雨機率、風速與紫外線指數</li>
            <li className="img">
              <Image src={weatherImg} alt="temperature" preload />
            </li>
            <li
              className="showBtn"
              onClick={() => {
                setGridState("s2")
              }}
            >
              Show
              <Gooey />
            </li>
          </div>
        </ul>
        <ul className="s3" style={{ "--area": "s3" }}>
          <div>
            <li className="title ">Location｜位置資訊</li>
            <li className="subTitle">依據你所在城市提供精準預報</li>
            <li className="info">支援 GPS 定位或手動選擇城市</li>
            <li className="img">
              <Image src={locationImg} alt="location" preload />
            </li>
            <li
              className="showBtn"
              onClick={() => {
                setGridState("s3")
              }}
            >
              Show
              <Gooey />
            </li>
          </div>
        </ul>
      </article>
      <article
        style={{ "--area": "f" }}
        className="web background"
        onMouseMove={handleMove}
      >
        <h1>ZEUS</h1>
        <Link href="./Weather">Go and try it!</Link>
      </article>
      <article style={{ "--area": "g" }} className="copyright">
        <div className="weatherApi">
          <h1>Powered by</h1>
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            target="_blank"
          >
            WeatherAPI.com
          </a>
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            target="_blank"
          >
            <img
              src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="Weather data by WeatherAPI.com"
              border="0"
            />
          </a>
        </div>
        <div className="ipApi">
          <h1>Powered by</h1>
          <a href="https://ipinfo.io/" title="ip API" target="_blank">
            IPinfo
          </a>
        </div>
        <div className="copyright">
          <h1>© 2026 Tomy </h1>
          <p>Built with Next.js & React. </p>
          <p>Weather data provided by WeatherAPI.com</p>
          <p>IP data provided by ipinfo.io</p>
        </div>
      </article>
    </main>
  )
}
