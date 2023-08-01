import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./todolist_reducer";
import {FilterValuesType, TodolistType} from "../App";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: TodolistType[];

test ('correct todolist should be removed', () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    // const endState = todoListsReducer(startState, {
    //     type: 'REMOVE-TODOLIST',
    //     todolistId: todolistId1
    // })

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test ('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";
    let newTodolistId = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    // const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test ('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId2,
        title: newTodolistTitle
    }

    // const endState = todoListsReducer(startState, action)
    const endState = todoListsReducer(startState, changeTodolistTitleAC(action.todolistId, action.title))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test ('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: todolistId2,
        filter: newFilter
    }

    // const endState = todoListsReducer(startState, action)
    const endState = todoListsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})