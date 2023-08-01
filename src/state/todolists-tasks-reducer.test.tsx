import {addTodolistAC, todoListsReducer} from "./todolist_reducer";
import {tasksReducer} from "./tasks_reducer";
import {TasksStateType, TodolistType} from "../App";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistId)
    expect(idFromTodolists).toBe(action.payload.newTodolistId)
})