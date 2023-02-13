import React from 'react';

import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: "1", isDone: true},
        {id: 2, title: "2", isDone: false},
        {id: 3, title: "3", isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Movies" tasks={tasks2}/>
        </div>
    );
}

export default App;
