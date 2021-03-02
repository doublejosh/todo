import React from 'react'
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
  return (
    <div>
      {[todoList.todos.keys()].map((id: IterableIterator<string>, index: number) => {
        const item = todoList.todos.get((id as unknown) as string)
        if (item) {
          return (
            <TodoView
              key={index}
              item={item}
              setItem={props.setItem}
              deleteItem={props.deleteItem}
            />
          )
        } else return
      })}
      <NewItem addItem={props.addItem} />
    </div>
  )
}
