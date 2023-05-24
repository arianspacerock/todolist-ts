import {FilterValuesType, todoListsType} from "../App";

export const todoListsReducer = (state: todoListsType[], action: TodolistReducerActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: todoListsType = {id: action.payload.newTodolistId, title: action.payload.title, filter: "all"}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

type TodolistReducerActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

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
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistId: newTodolistId,
            title: title
        }
    } as const
}
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: todolistId,
            title: title
        }
    } as const
}
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id: todolistId,
            filter: filter
        }
    } as const
}