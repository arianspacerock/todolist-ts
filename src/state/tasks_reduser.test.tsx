import {removeTaskAC, tasksReducer} from "./tasks_reducer";
import {AssocTaskType} from "../App";
import {v1} from "uuid";

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

    const action = removeTaskAC("TS2", "todolistID2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("HTML&CSS2");
    expect(endState["todolistID2"][0].isDone).toBe(true);
})