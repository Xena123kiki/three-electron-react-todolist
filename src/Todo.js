// https://enlight.nyc/projects/react-to-do-list

//TODO : visualization of number of isCompleted

import React, { useState } from "react";
// import reactDom from "react-dom";

import './Todo.css'

function Todo() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      todo: "아침에 일어나기",
      isCompleted: true
    },
    {
      todo: "아침 점심 저녁 꼭 챙겨 먹기",
      isCompleted: false
    },
    {
      todo: "살면서 해보지 않은 재밌는 일 하기",
      isCompleted: false
    }
  ]);

  function createNewTodo(currentTodo) {
    let todosArray = [...todos];
    todosArray.push({
      todo: currentTodo,
      isCompleted: false
    });
    setTodos(todosArray);
  }

  function completeTodo(index) {
    let todosArray = [...todos];
    todosArray[index].isCompleted = !todosArray[index].isCompleted;
    setTodos(todosArray);
  }

  function deleteTodo(index) {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
  }

  return (
    <div className = "todo-container">
      <input
        className="todo-input"
        value={currentTodo}
        onChange={e => {
          setCurrentTodo(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === "Enter") {
            createNewTodo(currentTodo);
            setCurrentTodo("");
          }
        }}
        placeholder="할 일을 입력해주세요"
      />
      {todos.map((todo, index) => (
        <div key={todo} className="todo">
          <div className="checkbox" onClick={() => completeTodo(index)}>
            {todo.isCompleted && <span>&#x2714;</span>}
          </div>
          <div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
          <div className="delete" onClick={() => deleteTodo(index)}>
            &#128465;
          </div>
        </div>
      ))}
      {/* {todos.length > 0 && `${todos.length} items`} */}
    </div>
  );
}
export default Todo;