import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
  // setTodos: Dispatch<SetStateAction<Map<string, Todo>>>
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
      console.log(todoList)
    })
  }, [todoList])

  return (
    <div>
      {builtList}
      <hr />
      <NewItem addItem={props.addItem} />
      <hr />
    </div>
  )
}
