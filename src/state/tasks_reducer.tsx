import {TasksStateType} from "../App"
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType} from "./todolist_reducer";


const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TodolistReducerActionType) : TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.newTodolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.payload.todolistId]
            // return copyState
            let {[action.payload.todolistId]: [], ...rest} = state // деструктуризация
            return rest
        }
        default:
            return state
    }
}

type TodolistReducerActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |
    ChangeTitleTaskActionType | AddTodolistType | RemoveTodolistType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId: taskId,
            todolistId: todolistId
        }
    } as const
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todolistId: newTodolistId
        }
    } as const
}

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId: taskId,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}

type ChangeTitleTaskActionType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId: taskId,
            newTitle: newTitle,
            todolistId: todolistId
        }
    } as const
}
