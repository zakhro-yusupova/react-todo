import "./todo.css";

const TodoItem = ({ isComplated, handleComplated, handleDeleteTodo, props }) => {

  const { title, id } = props
  return <li className="todo-item">
  <div className="wrapper">
  <input checked={isComplated} data-todo-id={id} type="checkbox" onChange={handleComplated}/>
  <span className={ isComplated && "complated" }>{title}</span>
  </div>
  <button className="close" onClick={handleDeleteTodo} data-todo-id={id} > x </button>
  </li>
}

export default TodoItem;
