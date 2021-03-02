import React, { useState } from 'react'
import { Button } from './Button'

export interface Todo {
  id: string
  desc: string
  done: boolean
  created?: string
  updated?: string
}

interface TodoViewProps {
  item: Todo
  setItem: (item: Todo) => void
  deleteItem: (id: string) => void
}

export const TodoView: React.FC<TodoViewProps> = ({ item, ...props }) => {
  const [desc, setDesc] = useState(item.desc)
  const descInit = item.desc

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value)
  }

  const handleDone = (item: Todo, done: boolean = true) => {
    props.setItem({ ...item, desc, done })
  }

  const handleSave = (item: Todo) => {
    props.setItem({ ...item, desc })
  }

  return (
    <div className={`todo-item todo-item--${item.done ? 'complete' : 'incomlpete'}`}>
      {!item.done ? (
        <Button label="Done" onClick={() => handleDone(item)} />
      ) : (
        <Button label="Todo" onClick={() => handleDone(item, false)} />
      )}
      <input
        placeholder="New todo"
        defaultValue={item.desc}
        type="text"
        onChange={handleChange}
      />
      {desc !== descInit && <Button label="Save" onClick={() => handleSave(item)} />}
      <Button label="Delete" onClick={() => props.deleteItem(item.id)} />
    </div>
  )
}

export const NewItem: React.FC<{ addItem: (desc: string) => void }> = ({ addItem }) => {
  const [desc, setDesc] = useState('')

  return (
    <div className="todo-item">
      <input
        value={desc}
        placeholder="New todo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
      />
      <Button
        label="Add"
        onClick={() => {
          if (desc) {
            addItem(desc)
            setDesc('')
          }
        }}
      />
      <Button label="Cancel" onClick={() => setDesc('')} />
    </div>
  )
}
