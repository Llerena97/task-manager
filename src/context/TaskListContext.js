import React, {createContext, useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('tasksFromManager')) || []
  const [tasks, setTasks] = useState(initialState)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    localStorage.setItem('tasksFromManager', JSON.stringify(tasks))
  }, [tasks])

  const addTask = title => {
    setTasks([...tasks, {title, id: uuid()}])
  }

  const editTask = (title, id) => {
    const newTasks = tasks.map(task => task.id === id ? {title, id} : task)
    setTasks(newTasks)
    setEditItem(null)
  }
  
  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const clearList = () => {
    setTasks([])
  }

  const findItem = id => {
    const item = tasks.find(task => task.id === id)
    setEditItem(item)
  }

  return <TaskListContext.Provider
    value={{tasks, editItem, addTask, removeTask, clearList, findItem, editTask}}
  >
    {props.children}
  </TaskListContext.Provider>
}

export default TaskListContextProvider