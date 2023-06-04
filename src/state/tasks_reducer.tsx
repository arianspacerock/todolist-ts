import {AssocTaskType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: AssocTaskType, action: TodolistReducerActionType) : AssocTaskType => {
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
        default:
            return state
    }
}

type TodolistReducerActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

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