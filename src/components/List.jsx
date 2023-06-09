import React, { useRef, useState } from 'react'

import useScroll from '../hooks/useScroll'

const List = () => {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)
  const limit = 20
  const parentRef = useRef()
  const childeRef = useRef()
  const intersected = useScroll(parentRef, childeRef, () => fetchTodos(page, limit))

 function fetchTodos(page, limit) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
      .then(response => response.json())
      .then(json => {
        setTodos(prev => [...prev, ...json])
        setPage(prev => prev +1)
      })
  }


  return (
    <div ref={parentRef} style={{height: '80vh', overflow: 'auto'}}>
      {todos.map(todo =>
        <div key={todo.id} style={{width: '500px', margin: '5px auto', padding: '20px', border: '1px solid aqua'}}>{todo.title}</div>
      )}
      <div ref={childeRef} style={{height: '20px', backgroundColor: 'tomato'}}></div>
    </div>
  )
}

export default List
