import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {FC, useState} from "react";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: '1', title: 'JS', isDone: true},
        todolistId: 'string',
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '1', title: 'CSS', isDone: false},
    }
}

const TaskWithHook: FC<TaskPropsType> = (args) => {
    const [task, setTask] = useState(args.task)
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }
    const changeTaskTitle = (title: string) => {
        setTask({...task, title: title})
    }

    return <Task changeTaskStatus={args.changeTaskStatus}
                 changeTaskTitle={args.changeTaskTitle}
                 removeTask={args.removeTask}
                 task={task}
                 todolistId={args.todolistId}
    />
}

export const TaskWithHookStory: Story = {
    render: (args => <TaskWithHook
        changeTaskStatus={args.changeTaskStatus}
        changeTaskTitle={args.changeTaskTitle}
        removeTask={args.removeTask}
        task={args.task}
        todolistId={args.todolistId}
    />)
}

