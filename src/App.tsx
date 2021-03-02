import React, { useState } from 'react'
import './App.css'
import { Todo } from './components/Todo'
import { ListView } from './components/List'
import { stringHash } from './utils/stringHash'
import { Button } from './components/Button'
import { sha256 } from 'crypto-hash'

const App: React.FC<{}> = () => {
  const [todoList, setTodos] = useState<Map<string, Todo>>(new Map())
  const updateMap = (k: string, v: Todo) => {
    setTodos(todoList.set(k, v))
  }

  const date = new Date()

  const setItem = (item: Todo) => {
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
      console.log(hash)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>#TODOS!</h1>
        <Button
          label="WTF!"
          onClick={() => {
            console.log('wat')
          }}
        />
        <ListView
          todoList={{ todos: todoList }}
          setItem={setItem}
          deleteItem={deleteItem}
          addItem={addItem}
        />
      </header>
    </div>
  )
}

export default App
