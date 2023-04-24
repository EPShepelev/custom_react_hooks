import { useLayoutEffect } from "react";

export default function useScroll(parentRef, childRef, callback) {
  //смотри intersection observer api
  //заменил useEffect т.к childRef.current при отписке был то ли null то ли undefined
  useLayoutEffect(()=> {
    const options = {
      // обект который отслеживаем
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 0
    }

    const observer = new IntersectionObserver(([target])=> {
      if(target.isIntersecting) {
        callback()
      }
    }, options)

    observer.observe(childRef.current)

    return function () {
      observer.unobserve(childRef.current)
    }
  }, [callback])
}