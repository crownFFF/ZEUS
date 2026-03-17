import { useCallback } from "react"

export const useSubmit = (setCity, setDate) => {
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      const { city, date } = e.currentTarget
      const cityValue = city?.value.trim()

      if (!cityValue) return
      setCity(cityValue)
      if (date?.value && setDate) {
        setDate(date.value.trim())
      }
    },
    [setCity, setDate],
  )
  return handleSubmit
}
