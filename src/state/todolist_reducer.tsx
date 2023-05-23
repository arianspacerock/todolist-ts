import {todoListsType} from "../App";
import {v1} from "uuid";

export const todoListsReducer = (state: todoListsType[], action: TodolistReducerActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = v1()
            let newTodolist: todoListsType = {id: newTodolistId, title: action.payload.title, filter: "all"}
            return [...state, newTodolist]
        }
        default:
            return state
    }
}

type TodolistReducerActionType = RemoveTodolistType | AddTodolistType

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { // можно и без payload просто todolistId
            todolistId: todolistId
        }
    } as const
}

type AddTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolistId: v1(),
            title: title
        }
    } as const
}