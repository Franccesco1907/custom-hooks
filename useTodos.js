import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = (initialState = []) => {
  // todoReducer: Esta función va a permitir gestionar el estado de los TODOs
  // initialState: Estado inicial de los TODOs
  // todos: Listado de TODOs
  // dispatch: Función que permite disparar las acciones que se van a ejecutar en el reducer
  // init: Función que permite inicializar el estado de los TODOs
  const [todos, dispatch] = useReducer(todoReducer, [], init)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleNewTodo = (todo) => {
    console.log(todo)
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    }
    dispatch(action)
  }

  const handleDeleteTodo = (id) => {
    console.log(id)
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    })
  }

  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    })
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,    
  }
}