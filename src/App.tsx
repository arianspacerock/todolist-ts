import React from 'react';

import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(() => {})
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks}/>
        </div>
    );
}

export default App;
