import "./todo.css";
import { useState, useEffect } from "react";
import { stringify, v4 as uuid } from "uuid";
export const Todo = () => {
  //to do
  const [todo, setTodo] = useState("");

  //todo list
  const [todoList, setTodoList] = useState([]);

  //todo-completed
  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };
  //written to do in the to do input

  const handleToDoSubmit = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      const updatedTodoList = [
        ...todoList,
        { _id: uuid(), todo, isComplete:false },
      ];
      setTodoList(updatedTodoList);
      setTodo("");
      localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }
  };

  //to check addedlist

  const handleTodoCheckTodoList = (todoId) => {
    const updatedTodoList = todoList.map((todo) =>
      todo._id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodoList(updatedTodoList);

    localStorage.setItem("todo", JSON.stringify(updatedTodoList));
  };

  //to get todolist

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
                    className={
                      isComplete
                        ? "todo-list-heading  cross d-flex "
                        : "todo-list-heading "
                    }
                  >
                    {todo}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
