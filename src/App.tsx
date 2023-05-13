import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import Button from "@mui/material/Button";
import ButtonAppBar from "./components/ButtonAppBar";


type AssocTaskType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed";

type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<todoListsType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolistID1]:
            [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
        [todolistID2]:
            [{id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false},
                {id: v1(), title: "Rest API2", isDone: false},
                {id: v1(), title: "GraphQL2", isDone: false},
            ],

    });

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ])

    //let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string, taskID: string) {
        setTasks({...tasks, [id]: tasks[id].filter(t => t.id !== taskID)});
    }

    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    }

    function changeStatus(todoListId: string, id: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone: isDone} : t)});
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        //setFilter(value);
        setTodoLists(todoLists.map(el =>
            el.id === todoListId ? {...el, filter: value} : el))
    }

    const removeTodolist = (id: string) => {
        setTodoLists(todoLists.filter(el => el.id !== id))
        delete tasks[id]
    }

    const addTodolist = (newTitle: string) => {
        let newTodolistId = v1();
        setTodoLists([{id: newTodolistId, title: newTitle, filter: "all"}, ...todoLists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        setTasks({...tasks,[todoListId]: tasks[todoListId].map(el =>
                el.id === taskId ? {...el, title: updateTitle} : el)})
    }

    const updateTodolistTitle = (todoListId: string, updateTitle: string) => {
        setTodoLists(todoLists.map(el =>
            el.id === todoListId ? {...el, title: updateTitle} : el))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <AddItemForm callBack={addTodolist}/>
            {todoLists.map(el => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
