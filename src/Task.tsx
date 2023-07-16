import React from 'react';
import {SuperCheckBox} from "./components/SuperCheckBox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
}

export const Task = (props: TaskPropsType) => {
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
};

