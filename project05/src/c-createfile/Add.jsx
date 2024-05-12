import { useState, useEffect } from 'react';
import '../CSS/Add.css';
import AddTodoForm from './AddForm'


// import EditForm from './EditForm'
// import TodoItem from './TodoItem'


const Add = () => {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
      });
      const [todo, setTodo] = useState("");
  
      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos])
    
      function handleInputChange(e) {
        setTodo(e.target.value);
      }
    
      function handleFormSubmit(e) {
        e.preventDefault();
        if (todo !== "") {
          setTodos([
            ...todos,
            {
              id: todos.length + 1,
              text: todo.trim()
            }
          ])
        }
        setTodo("");
      }

      console.log(todos)

      return (
        <div className="App">
          <h3>New presentation</h3>
            <AddTodoForm 
                todo={todo}
                onAddFormSubmit={handleFormSubmit}
                onAddInputChange={handleInputChange}
              />
        </div>
      );
    }



export default Add;
