import axios from "axios";

const settings = {
    withCredentials: true,
}

export const todolistAPI = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);

    },
    createTodolist(title: string) {
        return  axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings);

    },
    deleteTodolist(todoId: string) {
        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,settings);

    },
    updateTodolist(todoId: string, title: string) {
        return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title}, settings);
    }
}