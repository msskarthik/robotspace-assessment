// src/stores/auth.ts
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Define the shape of each Task
export interface Task {
    id: number;
    title: string;
    description: string;
    status: number;
    duedate: string;
}

// Define the shape of the task state
export interface TasksState {
    tasks: Task[];
}

// Create a writable store with the initial state
const initialTaskState = { tasks: [] };
const tasksStore: Writable<TasksState> = writable(initialTaskState);

export default tasksStore;
