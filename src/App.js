import { DndContext, closestCorners } from "@dnd-kit/core";
import "./App.css";
import Home from "./Pages/Home";
import Column from "./Components/Column";
import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
