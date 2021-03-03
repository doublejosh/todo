import React, { useState } from 'react'
import { Button } from './Button'
import {
  FaCheckCircle,
  FaRegCheckCircle,
  FaRegWindowClose,
  FaPlusCircle,
  FaEraser,
} from 'react-icons/fa'

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

  const handleDoneToggle = (item: Todo, done: boolean = true) => {
    props.setItem({ ...item, desc, done })
  }

  const handleSave = (item: Todo) => {
    props.setItem({ ...item, desc })
  }

  return (
    <div className={`todo-item todo-item--${item.done ? 'complete' : 'incomlpete'}`}>
      {!item.done ? (
        <Button
          label="Done"
          icon={<FaRegCheckCircle />}
          onClick={() => handleDoneToggle(item)}
        />
      ) : (
        <Button
          label="Todo"
          icon={<FaCheckCircle />}
          onClick={() => handleDoneToggle(item, false)}
        />
      )}
      <input
        placeholder="New todo"
        defaultValue={item.desc}
        type="text"
        onChange={handleChange}
      />
      {desc !== descInit && <Button label="Save" onClick={() => handleSave(item)} />}
      <Button
        label="Delete"
        icon={<FaRegWindowClose />}
        onClick={() => props.deleteItem(item.id)}
      />
    </div>
  )
}

export const NewItem: React.FC<{ addItem: (desc: string) => void }> = ({ addItem }) => {
  const [desc, setDesc] = useState('')

  const handleChange = (desc: string) => {
    if (desc) {
      addItem(desc)
      setDesc('')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event)

    if (event.key === 'Enter') {
      handleChange(desc)
    }
  }

  return (
    <div className="todo-item todo-item--new">
      <input
        value={desc}
        placeholder="New todo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button label="Add" icon={<FaPlusCircle />} onClick={() => handleChange(desc)} />
      <Button label="Cancel" icon={<FaEraser />} onClick={() => setDesc('')} />
    </div>
  )
}
