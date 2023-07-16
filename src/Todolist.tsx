import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Button, {ButtonProps} from "@mui/material/Button";
import {SuperCheckBox} from "./components/SuperCheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle : (todoListId: string, updateTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {
// , (prevProps, nextProps) => {
//         if (nextProps.filter !== prevProps.filter) return false
//         if (nextProps.tasks !== prevProps.tasks) return false
//         return true
//     })
    const onAllClickHandler = useCallback( () => props.changeFilter(props.id, "all"), [props.id])
    const onActiveClickHandler = useCallback ( () => props.changeFilter(props.id, "active"), [props.id])
    const onCompletedClickHandler = useCallback( () => props.changeFilter(props.id, "completed"), [props.id])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id);
    }

    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [])

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        props.updateTask(props.id, taskId, updateTitle)
    }

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        props.updateTodolistTitle(props.id, updateTitle)
    }, [props.updateTodolistTitle, props.id])

    const changeStatusHandler = (taskId: string, changeEvent: boolean) => {
        props.changeTaskStatus(props.id, taskId, changeEvent)
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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id,t.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                    // }
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
            <ButtonWithMemo title={'All'}
                            color={'success'}
                            variant={props.filter === 'all' ? "outlined" : "contained"}
                            onClick={onAllClickHandler}
            />
            <ButtonWithMemo title={'Active'}
                            color={'success'}
                            variant={props.filter === 'active' ? "outlined" : "contained"}
                            onClick={onActiveClickHandler}
            />
            <ButtonWithMemo title={'Completed'}
                            color={'success'}
                            variant={props.filter === 'completed' ? "outlined" : "contained"}
                            onClick={onCompletedClickHandler}
            />

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
})

// type ButtonWithMemoPropsType = {
//     title: string
//     color: 'inherit' | "success" | "error" | "warning" | "info" | "primary" | "secondary"
//     variant: "outlined" | "contained" | "text"
//     onClick: () => void
// }

const ButtonWithMemo = memo((props: ButtonProps) => {
    return <Button variant={props.variant}
                   color={props.color}
                   onClick={props.onClick}>{props.title}
    </Button>
})
