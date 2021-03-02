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

  const handleDone = () => {
    props.setItem({ ...item, desc, done: true })
  }

  const handleSave = () => {
    props.setItem({ ...item, desc })
  }

  return (
    <form>
      <input placeholder="New todo" value={item.desc} onChange={handleChange} />
      <Button label="Delete" onClick={() => props.deleteItem(item.id)} />
      <Button label="Done!" onClick={() => handleDone} />
      {desc !== descInit && <Button label="Save" onClick={handleSave} />}
    </form>
  )
}

export const NewItem: React.FC<{ addItem: (desc: string) => void }> = ({ addItem }) => {
  const [desc, setDesc] = useState('')

  return (
    <div>
      <input
        placeholder="New todo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
      />
      <Button label="Add" onClick={() => addItem(desc)} />
      <Button label="Cancel" onClick={() => setDesc('')} />
    </div>
  )
}
