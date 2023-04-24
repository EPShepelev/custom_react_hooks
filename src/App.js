import './App.css';
import { useState } from 'react';
import axios from 'axios';

import Hover from './components/Hover'
import List from './components/List';

import useInput from './hooks/useInput'
import useDebounce from './hooks/useDebounce';
import useRequest from './hooks/useRequest';

function App() {
  const userName = useInput('')
  const password = useInput('')
  const [query, serQuery ]= useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const [list, loading, error] = useRequest(fetchList)

  // запрос для хука useDebounce (поиск без нажатия на кнопку)
  function search(query) {
    fetch('https://jsonplaceholder.typicode.com/todos?_query='+ query)
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
  }
  
  // запрос для хука useRequest 
  function fetchList() {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
  }

  const onChange = e => {
    serQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  if (loading) {
    return <h1>Идет загрузка...</h1>
  }

  if (error) {
    return <h1>Произошла ошибка при загрузке</h1>
  }


  return (
    <div className="App">
      {/* 4 useDebounce (поиск без нажатия на кнопку) */}
     <div>
     <input type='text' placeholder='search' onChange={onChange} value={query}/>
     </div>
     {/* 1 Хук с функционалом управляемого инпута */}
      {/* {...userName} в инпуте ниже - передаем и разворачиваем то что возвращает кастомный хук т.е. значение и функцию jnChange */}
     <input type='text' placeholder='username' {...userName}/>
     <input type='text' placeholder='password' {...password}/>
     <button onClick={() => console.log(userName.value, password.value)}>Click</button>

     {/* 2 Внутри хук с функционалом ховера */}
     <Hover />

     {/* 5 Выше хук получения данных, а это результирующий список */}
     <div>
        {list && list.map(item =>
          <div 
            key={item.id} 
            style={{width: '300px', margin: '5px auto', padding: '10px', border: '1px solid lime'}}
          >
            {item.title}
          </div>
        )}
     </div>

     {/* 3 Внутри хук с функционалом динамической пагинации (бесконечный скрол для большого списка item)*/}
     <List />

    </div>
  );
}

export default App;
