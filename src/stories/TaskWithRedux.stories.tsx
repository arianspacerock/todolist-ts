import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";
import {TaskWithRedux} from "../TaskWithRedux";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const TaskReduxWrap = () => {
    const todolistId = "todolistId1";
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId][0]);
    return <TaskWithRedux task={task} todolistId={todolistId} />;
}
export const AppWithReduxStory: Story = {
   //render: () => <Provider store={store}><AppWithRedux/></Provider>
};

