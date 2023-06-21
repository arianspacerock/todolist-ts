import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todolist_reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasks_reducer";


export type AssocTaskType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    function removeTask(id: string, taskID: string) {
        dispatchToTasks(removeTaskAC(taskID, id));
    }

    function addTask(todoListId: string, title: string) {
        dispatchToTasks(addTaskAC(title, todoListId));
    }

    function changeStatus(todoListId: string, id: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListId));
    }

    function changeFilter(value: FilterValuesType,todoListId: string) {
        dispatchToTodoLists(changeTodolistFilterAC(todoListId, value));
    }

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        dispatchToTasks(changeTitleTaskAC(updateTitle, taskId, todoListId));
    }

    const updateTodolistTitle = (todoListId: string, updateTitle: string) => {
        dispatchToTodoLists(changeTodolistTitleAC(todoListId, updateTitle));
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container style={{padding: "10px"}}>
                    {todoLists.map(el => {
                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <Todolist
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
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers;
