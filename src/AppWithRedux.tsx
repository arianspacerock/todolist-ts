import React, {useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type AssocTaskType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {

    let state = useSelector<AppRootStateType, AppRootStateType>(state => state)

    let todoLists = state.todolists

    //let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks)

    const dispatch = useDispatch();

    function removeTask(id: string, taskID: string) {
        dispatch(removeTaskAC(taskID, id));
    }

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(title, todoListId));
    }, [dispatch])

    function changeStatus(todoListId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(id, isDone, todoListId));
    }

    function changeFilter(value: FilterValuesType,todoListId: string) {
        dispatch(changeTodolistFilterAC(todoListId, value));
    }

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id);
        dispatch(action);
    }

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    }, [])

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTitleTaskAC(updateTitle, taskId, todoListId));
    }

    const updateTodolistTitle = (todoListId: string, updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListId, updateTitle));
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
                        // let tasksForTodolist = tasks[el.id];
                        // if (el.filter === "active") {
                        //     tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        // }
                        // if (el.filter === "completed") {
                        //     tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        // }

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: "10px"}}>
                                    <TodolistWithRedux
                                        id={el.id}
                                        title={el.title}
                                        filter={el.filter}
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

export default AppWithRedux;
