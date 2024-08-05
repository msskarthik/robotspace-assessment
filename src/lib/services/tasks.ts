import { Protected } from "$lib/interceptors/axios";
import tasksStore, { type Task } from "$lib/stores/tasks";

// get all tasks available
const getAllTasks = async (): Promise<boolean> => {
    try {
        const result: any = await Protected.get("items/tasks");
        tasksStore.set({ tasks: result.data });
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
};

// delete the task based on id
const deleteTask = async (id: number): Promise<boolean> => {
    try {
        await Protected.delete(`items/tasks/${id}`);
        // Update the store by filtering out the deleted task
        tasksStore.update((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

type PayloadObj = {
    title: string;
    description: string;
    status: number;
    duedate: Date;
}
// add new task
const addNewTask = async (payload: PayloadObj): Promise<boolean> => {
    try {
        const result: any = await Protected.post("items/tasks", payload);
        // Update the store with the new task
        tasksStore.update((state) => ({
            tasks: [...state.tasks, result.data]
        }));
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
};

// update a task
const updateTask = async (payload: any): Promise<boolean> => {
    try {
        const { id, value } = payload;
        const response: any = await Protected.patch(`items/tasks/${id}`, { status: value });
        // Update the store
        tasksStore.update((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, status: response.data.status } : task
            )
        }));
        return true;
    } catch (error: any) {
        console.error(error);
        return false;
    }
}

const tasksAPIs = { getAllTasks, deleteTask, addNewTask, updateTask };

export default tasksAPIs;