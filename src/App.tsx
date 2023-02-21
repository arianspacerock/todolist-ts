import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "RTK", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(t => t.id !== id)
    }

    let tasksForToDoList = tasks
    if (filter === "completed") {
        tasksForToDoList = tasks.filter( t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForToDoList = tasks.filter( t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
