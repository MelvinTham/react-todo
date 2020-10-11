import React, {useEffect,useState} from 'react';
import './App.css';
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import Typography from "@material-ui/core/Typography";
const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storagetodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storagetodos){
       setTodos(storagetodos)
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo){
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id){
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          return{
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }
  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className="App">
      
        <Typography variant="h1" style ={{padding : 16}}>
          React Todo
        </Typography>
        <TodoForm addTodo={addTodo}> </TodoForm>
        <TodoList 
          todos={todos} 
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
    </div>
  );
}

export default App;
