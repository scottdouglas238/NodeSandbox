import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  
  useEffect(() =>{
    fetch("/api/todos")
    .then((res) => res.json())
    .then((data) => setTodos(data));
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    fetch("/api/todos", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: text})
    })
    .then((res) => res.json())
    .then((data) => setTodos([...todos, data]));
  }

  function handleDelete (id){
    fetch("/api/todos/" + id, {
      method: "DELETE"
    }).then(res => res.json())
    .then(dbTodo => setTodos(todos.filter(todo => todo._id !== dbTodo._id)))
  }

  return (


    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
          value={text}
          onChange={e => setText(e.target.value)}
          type="text"
          />
          <button type="submit">Submit</button>
        </form>
        <h1>Your...face doesn't like trash!</h1>
        {todos.length !== 0 ? (
          <ul>
          {todos.map(todo => (
            <li key={todo._id}>{todo.text}{" "}
            <button onClick={() => handleDelete(todo._id)}>X</button></li>
          ))}
          </ul>
        ): <h2>No todos to show!</h2>}
      </header>
    </div>
  );
}

export default App;
