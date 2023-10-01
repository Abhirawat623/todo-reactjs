import "./todo.css";
import { useState, useEffect } from "react";
import { stringify, v4 as uuid } from "uuid";
export const Todo = () => {

  const [todo, setTodo] = useState("");

  const [todoList, setTodoList] = useState([]);

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };


  const handleToDoSubmit = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      const updatedTodoList = [
        ...todoList,
        { _id: uuid(), todo, isComplete: false },
      ];
      setTodoList(updatedTodoList);
      setTodo("");
      localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }
  };

  

  const handleTodoCheckTodoList = (todoId) => {
    let updatedTodoList = todoList.map((todo) =>
      todo._id === todoId ? { ...todo, isComplete : !todo.isComplete } : todo);
     
    setTodoList(updatedTodoList);
    localStorage.setItem("todo", JSON.stringify(updatedTodoList));
  };

  const handleRefresh = () => {
    setTodoList("");
    localStorage.removeItem("todo");
  };

 
  const handleTodoClear=(todoId)=>{
    const filterdTodo = todoList.filter(({_id})=>
        _id !== todoId
    )
 setTodoList(filterdTodo);
 localStorage.setItem("todo",JSON.stringify(filterdTodo));
}



  useEffect(() => {
    const todoWritten = JSON.parse(localStorage.getItem("todo"));
    todoWritten && setTodoList(todoWritten);
  }, []);



  return (
    <div className="app-container">
      <input
        value={todo}
        className="todo-input"
        placeholder="type your To-Do"
        required
        onChange={handleTodoChange}
        onKeyPress={handleToDoSubmit}
      />

      <div className="todo-container">
        <div className="todo-list">
          {todoList &&
            todoList.map(({ todo, _id, isComplete }) => {
              return (
                <div key={_id}>
                  <input
                    id={_id}
                    type="checkbox"
                    className="user-task heading-5 "
                    onChange={() => handleTodoCheckTodoList(_id)}
                    checked={isComplete}
                    
                  />
                  <label
                    for={_id}
                    className={isComplete ? "complete" : "incomplete "}
                    onClick={()=>handleTodoClear(_id)}
                  
                  >
                    {todo}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
      <button className="reset-btn" onClick={handleRefresh}>
        <span class="material-symbols-outlined">refresh</span>
      </button>
    </div>
  );
};
