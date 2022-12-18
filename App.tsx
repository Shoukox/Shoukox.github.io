import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import { Todo } from './Models/TodoModel';
import { User } from './Models/UserModel';
import Login from './Views/Login';
import Register from './Views/Register';
import Taskify from './Views/Taskify';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User>({ id: -1, name: "not_logged", password: "" });
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>((JSON.parse(localStorage.getItem("todo") as string) as unknown as Todo[]) ?? [])
  localStorage.setItem("todo", JSON.stringify(todos));

  const OnUserChanged = (user: User) => {
    setUser(user);
  }
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination)
      return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    console.log(result);

    let addTodo: Todo;
    let active = todos.filter(m => !m.isDone);
    let completed = todos.filter(m => m.isDone);

    console.log(active);
    console.log(completed);
    if (source.droppableId === "TodosList") {
      addTodo = active[source.index];
      active.splice(source.index, 1);
    }
    else {
      addTodo = completed[source.index];
      completed.splice(source.index, 1);
    }
    addTodo.isDone = destination.droppableId === "TodosListDone";

    if (addTodo.isDone) {
      completed.splice(destination.index, 0, addTodo);
    }
    else {
      active.splice(destination.index, 0, addTodo);
    }

    setTodos([...active, ...completed]);
  }

  const IsLoggedIn = () => {
    console.log(location.pathname);
    if (user.name === "not_logged" && (location.pathname in ["/login", "/register"])) {
      alert("Log in!");
      return <Navigate to="/login" />
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {
          IsLoggedIn()
        }
        <Routes>
          <Route path="/" element={<Taskify user={user} setUser={OnUserChanged} todo={todo} todos={todos} setTodo={setTodo} setTodos={setTodos} />} />
          <Route path="/taskify" element={<Taskify user={user} setUser={OnUserChanged} todo={todo} todos={todos} setTodo={setTodo} setTodos={setTodos} />} />
          <Route path="/login" element={<Login user={user} setUser={OnUserChanged} navigate={navigate} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </DragDropContext>
  );
}

export default App;
