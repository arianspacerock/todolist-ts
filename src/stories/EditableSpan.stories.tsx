import type {Meta, StoryObj} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {FC, useState} from "react";
import {EditableSpan} from "../EditableSpan";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        value: 'Hello',
    }
}

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanExample: Story = {}

