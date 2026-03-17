'use client';
import useSWR from "swr"

const fetcher = async url => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed:${res.status}`)
  return res.json()
}

export function useLocation() {
  return useSWR("/api/location", fetcher, {
    // 避免切換 tab / focus 又打一次
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // 2 分鐘內同 key 重複使用，不再重打
    dedupingInterval: 2 * 60 * 1000,
    // 覺得資料可接受的「新鮮度」
    refreshInterval: 0,
  })
}
