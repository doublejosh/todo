import React, { useEffect, useState } from 'react'
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
  const builtList: JSX.Element[] = []

  useEffect(() => {
    console.log('Building!')

    todoList.todos.forEach((item, key) => {
      builtList.push(
        <TodoView
          key={key}
          item={item}
          setItem={props.setItem}
          deleteItem={props.deleteItem}
        />
      )
    })
  }, [todoList.todos])

  return (
    <div>
      {builtList}
      <hr />
      <NewItem addItem={props.addItem} />
      <hr />
    </div>
  )
}
