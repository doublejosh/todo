import React, { useState, useCallback, useEffect } from 'react'
import './App.scss'
import { Todo } from './components/Todo'
import { ListView } from './components/List'
import { Button } from './components/Button'
import { sha256 } from 'crypto-hash'
import { logger } from './utils/logger'

import { default as sampleData } from './test/data/sample-todos.json'

const App: React.FC<{}> = () => {
  const [todoList, setTodos] = useState<Map<string, Todo>>(new Map())
  // maps don't seem to allow state listening via useEffect
  const [, updateState] = React.useState<object>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [doneCount, setDoneCount] = useState<number>(0)

  const updateMap = (k: string, v: Todo) => {
    setTodos(todoList.set(k, v))
    forceUpdate()
  }

  const setItem = (item: Todo) => {
    const date = new Date()
    updateMap(item.id, { ...item, updated: date.toString() })
  }

  const deleteItem = (id: string) => {
    todoList.delete(id)
    setTodos(todoList)
    forceUpdate()
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
      forceUpdate()
      logger('Item Added')
    })
  }

  const clearList = () => {
    setTodos(new Map())
    forceUpdate()
    logger('List cleared')
  }

  const loadSample = () => {
    const sampleList = new Map()
    sampleData.forEach(t => {
      sampleList.set(t.id, t)
    })
    setTodos(sampleList)
    forceUpdate()
  }

  useEffect(() => {
    let howManyDone = 0
    Array.from(todoList.keys()).map((id: string) => {
      if (todoList.get(id)?.done === true) howManyDone++
    })
    setDoneCount(howManyDone)
    // stuck observing functions, the map doesn't work.
  }, [updateMap, deleteItem, addItem, clearList, loadSample])

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODOS</h1>
        <p>{`You have ${doneCount}/${todoList.size} things to do.`}</p>
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
