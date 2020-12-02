import React, {createContext, useState} from 'react'
import { v4 as uuid } from 'uuid';

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const [tasks, setTasks] = useState([{title: 'read a book', id: 1}, {title: 'go to run', id: 2}])

  const addTask = title => {
    setTasks([...tasks, {title, id: uuid()}])
  }
  
  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const clearList = id => {
    setTasks([])
  }

  return <TaskListContext.Provider
    value={{tasks, addTask, removeTask, clearList}}
  >
    {props.children}
  </TaskListContext.Provider>
}

export default TaskListContextProvider