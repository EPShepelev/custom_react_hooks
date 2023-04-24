import { useEffect, useState } from "react";

//хук реализующий функционал наведения на элемент - по возвращаемому значению можно реализоывать логику наведения
export default function useHover(ref) {
   const [isHovering, setIsHovering] = useState(false)

   const on = () => setIsHovering(true)
   const off = () => setIsHovering(false)

   useEffect(()=> {
    // проверка на существование current
    if (!ref.current) {
        return
    }

    const node = ref.current

    node.addEventListener('mouseenter', on)
    node.addEventListener('mousemove', on)
    node.addEventListener('mouseleave', off)

    // удаляем слушатели когда компонент демонтируется,  return function () вызывается когда компонент демонтируется
    return function () {
        node.removeEventListener('mouseenter', on)
        node.removeEventListener('mousemove', on)
        node.removeEventListener('mouseleave', off)
    }
   }, [])
// возвращает состояние isHovering чтобы отслеживать изменения
   return isHovering
}