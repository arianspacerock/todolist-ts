import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: any
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
                <ul>
                    {
                        props.tasks.map(t =>
                            <li>
                                <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={ () => props.removeTask }>X</button>
                            </li>
                        )
                    }
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}