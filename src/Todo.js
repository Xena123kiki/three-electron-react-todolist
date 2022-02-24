// // https://enlight.nyc/projects/react-to-do-list

// //TODO : visualization of number of isCompleted

// import React, { useState } from "react";

// import './Todo.css'

// function Todo() {
//   const [currentTodo, setCurrentTodo] = useState("");
//   const [todos, setTodos] = useState([
//     {
//       todo: "아침에 일어나기",
//       isCompleted: true
//     },
//     {
//       todo: "아침 점심 저녁 꼭 챙겨 먹기",
//       isCompleted: false
//     },
//     {
//       todo: "살면서 해보지 않은 재밌는 일 하기",
//       isCompleted: false
//     }
//   ]);

//   function createNewTodo(currentTodo) {
//     let todosArray = [...todos];
//     todosArray.push({
//       todo: currentTodo,
//       isCompleted: false
//     });
//     setTodos(todosArray);
//   }

//   function completeTodo(index) {
//     let todosArray = [...todos];
//     todosArray[index].isCompleted = !todosArray[index].isCompleted;
//     setTodos(todosArray);
//   }

//   function deleteTodo(index) {
//     let todosArray = [...todos];
//     todosArray.splice(index, 1);
//     setTodos(todosArray);
//   }

//   return (
//     <div className = "todo-container">
//       <input
//         className="todo-input"
//         value={currentTodo}
//         onChange={e => {
//           setCurrentTodo(e.target.value);
//         }}
//         onKeyPress={e => {
//           if (e.key === "Enter") {
//             createNewTodo(currentTodo);
//             setCurrentTodo("");
//           }
//         }}
//         placeholder="할 일을 입력해주세요"
//       />
//       {todos.map((todo, index) => (
//         <div key={todo} className="todo">
//           <div className="checkbox" onClick={() => completeTodo(index)}>
//             {todo.isCompleted && <span>&#x2714;</span>}
//           </div>
//           <div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
//           <div className="delete" onClick={() => deleteTodo(index)}>
//             &#128465;
//           </div>
//         </div>
//       ))}
//       {/* {todos.length > 0 && `${todos.length} items`} */}
//     </div>
//   );
// }
// export default Todo;

// https://enlight.nyc/projects/react-to-do-list

//TODO : visualization of number of isCompleted

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

import waterImage from './textures/texture.jpg'

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

  const mountRef = useRef(null);

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

  useEffect(() => {

    var todosArray = [...todos]

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    // var container = document.getElementById('container')

    renderer.setSize( window.innerWidth, window.innerHeight);
    mountRef.current.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var texture = new THREE.TextureLoader().load( waterImage );

    // var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    var material = new THREE.MeshBasicMaterial({map: texture})

    var cube = new THREE.Mesh( geometry, material );

    scene.add( cube );

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
    scene.add(light)

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.005 * todosArray.length;
      cube.rotation.y += 0.005 * todosArray.length;
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div>
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
      <div ref = {mountRef}/>
    </div>
  );
}
export default Todo;