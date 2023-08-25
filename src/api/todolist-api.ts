import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {},
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');

    },
    createTodolist(title: string) {
        return  instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title});

    },
    deleteTodolist(todoId: string) {
        return  instance.delete<ResponseType>(`todo-lists/${todoId}`);

    },
    updateTodolist(todoId: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todoId}`, {title});
    }
}

type TodolistType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: T
}