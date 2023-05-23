import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, todoListsReducer} from "./todolist_reducer";
import {todoListsType} from "../App";

test ('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: todoListsType[] = [
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

    const startState: todoListsType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    // const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
    const endState = todoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})