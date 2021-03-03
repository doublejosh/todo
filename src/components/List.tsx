import React, { useEffect } from 'react'
import { TodoView, Todo, NewItem } from './Todo'

export interface List {
  title?: string
  todos: Map<string, Todo>
}

interface ListViewProps {
  todoList: List
  setItem: (item: Todo) => void
  deleteItem: (id: string) => void
  addItem: (desc: string) => void
}

export const ListView: React.FC<ListViewProps> = ({ todoList, ...props }) => {
  useEffect(() => {}, [todoList])

  return (
    <div>
      {Array.from(todoList.todos.keys()).map((id: string, index: number) => {
        const item = todoList.todos.get(id)
        return item ? (
          <TodoView
            key={id}
            item={item}
            setItem={props.setItem}
            deleteItem={props.deleteItem}
          />
        ) : null
      })}
      <NewItem addItem={props.addItem} />
      <hr />
    </div>
  )
}
