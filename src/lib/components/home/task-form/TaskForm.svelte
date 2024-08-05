<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
    import Flatpickr from "svelte-flatpickr";

    import "flatpickr/dist/flatpickr.css";

    import tasksAPIs from "$lib/services/tasks";
    import tasksStore from "$lib/stores/tasks";

    import type { Task } from "$lib/stores/tasks";
    import toastStore from "$lib/stores/toast";

    export let taskFormModal: boolean | undefined = false;
    let validations: any = { type: "", message: "" };
    let title: string = "";
    let description: string = "";
    let dueDate: Date = new Date();
    let isFormValid: boolean = false;
    let tasksList: Task[] = [];
    const dispatch = createEventDispatcher();

    // Reactively update when tasksStore changes
    $: {
        tasksStore.subscribe((state: any) => {
            tasksList = state.tasks;
        });
    }

    const closeModal = () => {
        dispatch("close");
        title = "";
        description = "";
        dueDate = new Date();
        validations = { type: "", message: "" };
    };

    $: if (title) {
        let check =
            /^(?!.*  )(?!.*\s{2})[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?( [a-zA-Z0-9]+(-[a-zA-Z0-9]+)?)*$/.test(
                title,
            );
        if (check) {
            let checkTitle = tasksList.findIndex(
                (item: Task) =>
                    item.title.toLowerCase().replaceAll(" ", "") ===
                    title.toLowerCase().replaceAll(" ", ""),
            );
            if (checkTitle !== -1) {
                isFormValid = false;
                validations = {
                    type: "title",
                    message: "Title should be unique.",
                };
            } else {
                if (title.length < 3) {
                    validations = {
                        type: "title",
                        message: "Min 3 characters is required.",
                    };
                    isFormValid = false;
                } else {
                    if (description.length < 3) {
                        validations = {
                            type: "description",
                            message: "Min 3 characters is required.",
                        };
                        isFormValid = false;
                    } else {
                        validations = { type: "", message: "" };
                    }
                }
                isFormValid =
                    title !== "" && description !== "" && dueDate !== undefined;
            }
        } else {
            validations = { type: "title", message: "Title is not valid." };
        }
    }

    const addNewTask = async () => {
        const payload = {
            title: title,
            description: description,
            status: 1,
            duedate: dueDate,
        };
        const result = await tasksAPIs.addNewTask(payload);
        if (result) {
            closeModal();
            toastStore.set({
                type: "green",
                message: "New Task added successfully.",
                showToast: true,
            });
        }
    };
</script>

<Modal
    title="Add New Task"
    class="bg-gray-800 border-none"
    bodyClass="border-none"
    headerClass="bg-gray-700 flex items-center px-4 py-2 text-gray-400 rounded-t-lg border-none"
    bind:open={taskFormModal}
    on:close={closeModal}
>
    <form
        class="p-4"
        on:submit={() => addNewTask()}
        on:reset={() => (isFormValid = false)}
    >
        <div class="custom-grid w-full">
            <div class="mb-4">
                <Label
                    for="title"
                    class="block mb-2 text-md font-medium text-white"
                    >Title</Label
                >
                <Input
                    type="text"
                    id="title"
                    placeholder="Sample Task"
                    bind:value={title}
                    required
                    class="block p-2 border-custom-black text-white bg-custom-black rounded-md"
                />
                {#if validations.type === "title"}
                    <small class="text-red-500">{validations.message}</small>
                {/if}
            </div>
            <div class="mb-4">
                <Label
                    for="due_date"
                    class="block mb-2 text-md font-medium text-white"
                    >Due Date</Label
                >
                <div class="relative max-w-sm">
                    <div
                        class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                    >
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                            />
                        </svg>
                    </div>
                    <Flatpickr
                        bind:value={dueDate}
                        options={{ minDate: new Date() }}
                        placeholder={"yyyy-mm-dd"}
                        dateFormat={"yyyy-mm-dd"}
                        class="px-9 py-2 w-full border text-sm block border-custom-black text-white fpcus:border-custom-orange bg-custom-black rounded-md"
                    />
                </div>
            </div>
        </div>
        <div>
            <Label
                for="textarea-id"
                class="block mb-2 text-md font-medium text-white"
                >Description</Label
            >
            <Textarea
                id="textarea-id"
                placeholder="Type here..."
                rows="4"
                required
                bind:value={description}
                class="block p-2 border-none text-white bg-custom-black rounded-md"
            />
            {#if validations.type === "description"}
                <small class="text-red-500">{validations.message}</small>
            {/if}
        </div>
        <div class="flex w-full items-center gap-2 justify-end mt-4">
            <Button
                type="reset"
                class="bg-transparent hover:bg-transparent border-none"
                >Clear</Button
            >
            <Button type="submit" disabled={!isFormValid}>Save</Button>
        </div>
    </form>
</Modal>
