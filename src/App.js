import React, {useEffect} from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/addTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

function App() {
    const [loading,setLoading] = React.useState(true)
    const [todos, setTodos] = React.useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false )
                },2500)
            })
    },[])

function toggleTodo(id) {
    setTodos(todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }
        return todo
    })
    )
}

function removeTodo (id) {
    setTodos(todos.filter(todo => todo.id !== id))
}

function addTodo(title) {
        setTodos(todos.concat([
            {
                title,
                id: Date.now(),
                completed: false
            }
        ]))
}

  return (
      <Context.Provider value={{removeTodo}}>
    <div className="wrapper">
      <h1>React SOBR </h1>
        <Modal/>
        <AddTodo onCreate={addTodo}/>
        {loading && <Loader/>}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> :(
            loading ? null : <p>СОБР закончился!</p> )}
    </div>
      </Context.Provider>
  )
}

export default App;
