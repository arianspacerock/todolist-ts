import {tasksReducer} from "./tasks_reducer";
import {todoListsReducer} from "./todolist_reducer";
import {combineReducers, legacy_createStore} from "redux";

// объединяя редюсеры с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, что бы можнось в консоли браузера обратиться к store в любой момент
//@ts-ignore
window.store = store
