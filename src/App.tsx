import React, {useState} from 'react';

import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const initTasks: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "RTK", isDone: false},
    ]

    let arr = useState(initTasks)

    let tasks = arr[0]
    let setTasks = arr[1]
    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(t => t.id !== id)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
