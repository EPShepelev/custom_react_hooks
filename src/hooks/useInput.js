import { useState } from "react";

//хук реализующий функционал управялемого ипута, чтобы не дублировать
export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
      }

    //возвращаем значение и функуию onChange
    return {value, onChange}
}