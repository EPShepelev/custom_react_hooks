import { useRef, useCallback } from "react"

export default function useDebounce(callback, delay) {
  const timer = useRef()

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    //таймаут перезаписывается пока пользователь вводит данные, как только он перестает - выполняется callback
    timer.current = setTimeout(()=> {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debouncedCallback
}
