import React, { useState, useEffect } from 'react'
import './App.css'
import { Todo } from './components/Todo'
import { ListView } from './components/List'
import { Button } from './components/Button'
import { sha256 } from 'crypto-hash'

import { default as sampleData } from './test/data/sample-todos.json'

const App: React.FC<{}> = () => {
  const [todoList, setTodos] = useState<Map<string, Todo>>(new Map())
  const updateMap = (k: string, v: Todo) => {
    setTodos(todoList.set(k, v))
  }

  const setItem = (item: Todo) => {
    const date = new Date()
    updateMap(item.id, { ...item, updated: date.toString() })
  }

  const deleteItem = (id: string) => {
    todoList.delete(id)
    setTodos(todoList)
  }

  const addItem = async (desc: string) => {
    const date = new Date()
    await sha256(desc.slice(0, 100) + date.toString()).then(hash => {
      updateMap(hash, {
        id: hash,
        desc,
        done: false,
        created: date.toString(),
        updated: date.toString(),
      })
    })
  }

  const clearList = () => {
    setTodos(new Map())
  }

  const loadSample = () => {
    const sampleList = new Map()
    sampleData.forEach(t => {
      sampleList.set(t.id, t)
    })
    setTodos(sampleList)
  }

  useEffect(() => {}, [updateMap, addItem])

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODOS</h1>
        <ListView
          todoList={{ todos: todoList }}
          setItem={setItem}
          deleteItem={deleteItem}
          addItem={addItem}
        />
        <Button label="Load Samples" onClick={loadSample} />
        <Button label="Clear List" onClick={clearList} />
      </header>
    </div>
  )
}

export default App
