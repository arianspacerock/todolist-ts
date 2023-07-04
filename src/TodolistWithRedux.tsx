import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {SuperCheckBox} from "./components/SuperCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks_reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist_reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()
    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "all"));
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "active"));
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "completed"));

    const removeTodolistHandler = () => {
        let action = removeTodolistAC(props.id);
        dispatch(action);
    }

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(newTitle, props.id));
    }

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        dispatch(changeTitleTaskAC(updateTitle, taskId, props.id));
    }
    const updateTodolistTitleHandler = (updateTitle: string) => {
        dispatch(changeTodolistTitleAC(props.id, updateTitle));
    }

    const changeStatusHandler = (taskId: string, changeEvent: boolean) => {
        dispatch(changeTaskStatusAC(taskId, changeEvent, props.id));
    }

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>
            {/*<button onClick={removeTodolistHandler}>X</button>*/}

            <IconButton aria-label='delete' onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        {/*<Checkbox onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <SuperCheckBox callBack={(changeEvent)=>changeStatusHandler(t.id, changeEvent)} isDone={t.isDone} />
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan callBack={(updateTitle)=>updateTaskHandler(t.id, updateTitle)} oldTitle={t.title}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label='delete' onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={ 'all' ? "outlined" : "contained"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={ 'active' ? "outlined" : "contained"} onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} onClick={onCompletedClickHandler}>Completed</Button>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
}
