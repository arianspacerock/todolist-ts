import {tasksReducer} from "./tasks_reducer";
import {todoListsReducer} from "./todolist_reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store