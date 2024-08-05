<script lang="ts">
    import {
        Select,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import type { Task } from "$lib/stores/tasks"; // Import the Task type
    import tasksAPIs from "$lib/services/tasks";
    import Empty from "$lib/assets/Empty.svelte";
    import toastStore from "$lib/stores/toast";

    export let filteredList: Task[] = [];
    let statusValues: any[] = [
        { name: "Active", value: "1" },
        { name: "Inactive", value: "0" },
    ];
    let tableHeads: string[] = [
        "id",
        "title",
        "description",
        "status",
        "duedate",
        "delete",
    ];

    const deleteTaskItem = async (id: number) => {
        const result = await tasksAPIs.deleteTask(id);
        if (result) {
            toastStore.set({
                type: "green",
                message: "Task deleted successfully",
                showToast: true,
            });
        }
    };

    const updateTask = async (event: any, id: number) => {
        let value = event.target.value;
        let result = await tasksAPIs.updateTask({ id: id, value: value });
        if(result) {
            toastStore.set({
                type: "green",
                message: "Task updated successfully",
                showToast: true,
            });
        }        
    }
</script>

<Table divClass="rounded-sm h-full w-full overflow-x-auto" shadow>
    <TableHead class="bg-gray-700 text-gray-200 rounded-t-lg sticky top-0">
        {#each tableHeads as tableHead}
            <TableHeadCell class="text-gray-400">{tableHead}</TableHeadCell>
        {/each}
    </TableHead>
    <TableBody tableBodyClass="rounded-b-lg h-full">
        {#if filteredList.length === 0}
            <TableBodyRow class="bg-gray-800 h-full">
                <TableBodyCell
                    colspan={tableHeads.length}
                    class="text-center text-gray-500 h-full"
                >
                    <div
                        class="flex flex-col justify-center w-full h-full items-center"
                    >
                        <Empty />
                        <h4>No results found</h4>
                    </div>
                </TableBodyCell>
            </TableBodyRow>
        {:else}
            {#each filteredList as task, index}
                <TableBodyRow class="bg-gray-800 text-white border-none">
                    <TableBodyCell class="text-white">{index + 1}</TableBodyCell
                    >
                    <TableBodyCell class="text-white truncate-class max-w-xs">
                        {task.title}
                    </TableBodyCell>
                    <TableBodyCell class="text-white lg:table-cell custom-description-class">
                        {task.description}
                    </TableBodyCell>
                    <TableBodyCell><Select on:change={(e) => updateTask(e, task.id)} class="bg-gray-700 rounded-lg border-none text-white w-1/2" items={statusValues} size="sm" bind:value={task.status} /></TableBodyCell>
                    <TableBodyCell class="text-white">
                        {task.duedate}
                    </TableBodyCell>
                    <TableBodyCell class="text-white">
                        <TrashBinOutline
                            withEvents
                            size="md"
                            class="cursor-pointer"
                            title={{ id: "delete", title: "Remove Task" }}
                            on:click={() => deleteTaskItem(task.id)}
                        />
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        {/if}
    </TableBody>
</Table>
