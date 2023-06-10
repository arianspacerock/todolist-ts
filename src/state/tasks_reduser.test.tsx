import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasks_reducer";
import {AssocTaskType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolist_reducer";

test ('correct task should be deleted from correct array', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
        ]
    }

    const action = removeTaskAC("todolistID2", "JS2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistID1": [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: v1(), title: "HTML&CSS2", isDone: false},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
        ]
    })
})

test ('correct task should be added to correct array', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
        ]
    }

    const action = addTaskAC("TS2", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("TS2");
    expect(endState["todolistID2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
        ]
    }

    const action = changeTaskStatusAC("2", false, "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID2"][1].isDone).toBe(false);
    expect(endState["todolistID1"][1].isDone).toBe(true);
})

test('title of specified task should be changed', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
        ]
    }

    const action = changeTitleTaskAC("2", "JS1", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID2"][1].isDone).toBe("JS1");
    expect(endState["todolistID1"][1].isDone).toBe("JS");
})

test('new array should be added when new todolist is added', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
        ]
    }

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistID1" && k != "todolistID2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {
    const startState: AssocTaskType = {
        "todolistID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todolistID2": [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
        ]
    }

    const action = removeTodolistAC("todolistID2");

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
})
