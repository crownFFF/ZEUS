"use client"

import useSWR from "swr"

const fetcher = async url => {
  const res = await fetch(url)
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const msg = data?.error || data?.message || `Failed:${res.status}`
    const err = new Error(msg)
    err.status = res.status
    err.payload = data
    throw err
  }
  return data
}

export function useWeather(city, mode = "current",date) {
  const normalizedCity = city?.trim()
  const normalizedMode = mode?.trim() || "current"
  const normalizedDate = date?.trim()


  const key = (()=>{
    if(!normalizedCity) return null
    if(normalizedMode === "history" && !normalizedDate) return null
    const params = new URLSearchParams({
      mode:normalizedMode,
      city:normalizedCity
    })
    if(normalizedMode === "history"){
      params.set("dt",normalizedDate)
    }
    return `/api/weather?${params.toString()}`
  })
  return useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 2 * 60 * 1000,
    refreshInterval: 0,
    keepPreviousData: true,
  })
}
