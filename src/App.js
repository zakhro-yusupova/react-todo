import { useState } from 'react';
import TodoItem from './components/Todo/Todoitem';

import "./assets/main.css";


function App() {

  const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem("todos")) || []);

  const [status, setStatus] = useState();

  function handleCreateTodo(evt){
    const newTodo = {
      id: todos[todos.length -1]?.id + 1 || 0,
      title: evt.target.value,
      isComplated: false
    }

    if(evt.code === "Enter"){
      evt.target.value = null;
      setTodos([...todos, newTodo]);
      window.localStorage.setItem("todos", JSON.stringify([...todos,newTodo]));
    }
  }

  function handleDeleteTodo(evt){
    const deletedTodoId = evt.target.dataset.todoId - 0;
    const filteredArr = todos.filter(item => item.id !== deletedTodoId);
    setTodos(filteredArr);
    window.localStorage.setItem("todos", JSON.stringify(filteredArr));
  }


  function handleComplated (evt) {
    const complatedId = evt.target.dataset.todoId - 0;
    const findedItem = todos.find(item => item.id === complatedId);
    findedItem.isComplated = !findedItem.isComplated;
    setTodos([...todos])
    window.localStorage.setItem("todos", JSON.stringify([...todos]))
  }

function getAll (){
  setStatus("all")
  setTodos(JSON.parse(window.localStorage.getItem("todos")))
}

function getActive () {
  setStatus(false)
  setTodos(JSON.parse(window.localStorage.getItem("todos")).filter(item => item.isComplated === false))
}

function getComplated () {
  setStatus(true)
  setTodos(JSON.parse(window.localStorage.getItem("todos")).filter(item => item.isComplated === true))
}
  return (
    <div className='todo-wrapper'>

    <h1 className='title'>Tasks for today</h1>

    <input className='todo-input' onKeyUp={handleCreateTodo} type="text" placeholder="Add a task" />

    <ul className='todo-list'>
    {
      todos.map(item => (
        <TodoItem key={item.id} handleComplated={handleComplated} handleDeleteTodo={handleDeleteTodo} isComplated={item.isComplated} props={item}/>
        ))
      }
      </ul>

        <button className='btn' onClick={getAll}>All</button>
        <button className='btn' onClick={getActive}>Active</button>
        <button className='btn' onClick={getComplated}>Complated</button>
      </div>
      )
    }

    export default App;
