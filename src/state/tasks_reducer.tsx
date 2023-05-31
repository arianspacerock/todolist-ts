import {AssocTaskType} from "../App";

export const tasksReducer = (state: AssocTaskType, action: TodolistReducerActionType) : AssocTaskType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "": {
            return state
        }
        default:
            return state
    }
}

type TodolistReducerActionType = RemoveTaskActionType | SActionType

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

type SActionType = ReturnType<typeof secondAC>
export const secondAC = (title: string, newTodolistId: string) => {
    return {
        type: "",
    } as const
}