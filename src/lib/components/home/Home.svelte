<script lang="ts">
    import { Button, Datepicker, Input } from "flowbite-svelte";
    import TaskTable from "./table/TaskTable.svelte";
    import TaskForm from "./task-form/TaskForm.svelte";
    import type { Task } from "$lib/stores/tasks";
    import tasksStore from "$lib/stores/tasks";

    let taskFormModal: boolean = false;
    let searchInput: string = "";
    // Use the Task type for tasks
    let filteredList: Task[] = [];
    let tasksList: Task[] = [];

    $: if (searchInput) {
        if (searchInput.trim() === "" || searchInput.trim().length < 3) {
            filteredList = tasksList;
        } else {
            filteredList = tasksList.filter((task: Task) => {
                const lowerSearchInput = searchInput.toLowerCase();
                return (
                    task.title.toLowerCase().includes(lowerSearchInput) ||
                    task.description.toLowerCase().includes(lowerSearchInput) ||
                    (task.duedate &&
                        task.duedate.includes(lowerSearchInput))
                );
            });
        }
    }

    // Reactively update when tasksStore changes
    $: {
        tasksStore.subscribe((state: any) => {
            tasksList = state.tasks;
            filteredList = tasksList;
        });
    }

    const closeTaskFormModal = () => {
        taskFormModal = false;
    };
</script>

<div class="flex justify-center w-full h-full p-4">
    <div class="w-full flex flex-col gap-4 h-full">
        <!-- Container for the input and button -->
        <div class="flex sm:justify-between md:justify-end gap-2 w-full">
            <Input
                placeholder="Search by title, description, date"
                bind:value={searchInput}
                class="block sm:w-1/2 md:w-1/4 p-2 border-custom-black text-white bg-custom-black rounded-md"
            />
            <Button
                class="w-full sm:w-auto"
                on:click={() => (taskFormModal = true)}>Add Task</Button
            >
            <TaskForm {taskFormModal} on:close={closeTaskFormModal} />
        </div>
        <!-- Apply rounded border classes to TaskTable container -->
        <div
            class="rounded-lg border border-gray-800 overflow-hidden h-full bg-gray-800"
        >
            <TaskTable {filteredList} />
        </div>
    </div>
</div>

<style>
    @media (max-width: 640px) {
        .flex {
            flex-direction: column;
        }
    }
</style>
