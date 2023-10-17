import axios from 'axios';
import { AuthResponse } from '../types/auth/authResponse';
import { CreateToDoItem } from '../types/todo/createToDoItem';
import { UpdateToDoItem } from '../types/todo/updateToDoItem';
import { statusCode } from '../constants/statusCode';
import { getAllToDoItemsUrl, getToDoItemUrl, newToDoItemUrl, updateToDoItemUrl } from '../constants/service';
import { ToDoItem } from '../types/todo/todoItem';
import { getAccessToken } from './localStorageService';
import { ToDoSelector } from '../types/todo/toDoSelector';

export const getToDo = async(id: number) => {
    try {
        const { data, status } = await axios.get<ApiResponse<ToDoItem>>(`${process.env.NEXT_BASE_URL}${getToDoItemUrl}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        });

        if (status === statusCode.ok) {
            return data.result;
        } else if (status === statusCode.badRequest) {
            throw new Error('UserName or Password is incorrect');
        }

        return null;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}

export const getAllToDoItems = async() => {
    try {
        const { data, status } = await axios.get<ApiResponse<ToDoSelector[]>>(`${process.env.NEXT_BASE_URL}${getAllToDoItemsUrl}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        });

        if (status === statusCode.ok) {
            return data.result;
        } else if (status === statusCode.badRequest) {
            throw new Error('UserName or Password is incorrect');
        }

        throw new Error('An unexpected error occurred');
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}

export const createToDo = async(toDoItem: CreateToDoItem) => {
    try {
        const { data, status } = await axios.post<AuthResponse>(`${process.env.NEXT_BASE_URL}${newToDoItemUrl}`, {
            'Description': toDoItem.description,
            'IsDone': toDoItem.isDone
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        });

        if (status === statusCode.ok) {
            return data;
        } else if (status === statusCode.badRequest) {
            throw new Error('UserName or Password is incorrect');
        }

        throw new Error('An unexpected error occurred');
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}

export const updateToDo = async(id: number, toDoItem: UpdateToDoItem) => {
    try {
        const { data, status } = await axios.put<AuthResponse>(`${process.env.NEXT_BASE_URL}${updateToDoItemUrl}/${id}`, {
            'Description': toDoItem.description,
            'IsDone': toDoItem.isDone
        }, {
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        });

        if (status === statusCode.ok) {
            return data;
        } else if (status === statusCode.badRequest) {
            throw new Error('UserName or Password is incorrect');
        }

        throw new Error('An unexpected error occurred');
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export const deleteToDo = async(id: number) => {
    try {
        const { data, status } = await axios.delete<AuthResponse>(`${process.env.NEXT_BASE_URL}${updateToDoItemUrl}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            }
        });

        if (status === statusCode.ok) {
            return data;
        } else if (status === statusCode.badRequest) {
            throw new Error('An unexpected error occurred');
        }

        throw new Error('An unexpected error occurred');
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
