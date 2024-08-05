<script lang="ts">
    import Home from "$lib/components/home/Home.svelte";
    import AuthAPIs from "$lib/services/auth";
    import tasksAPIs from "$lib/services/tasks";
    import type { ToastState } from "$lib/stores/toast";
    import toastStore from "$lib/stores/toast";
    import { Toast } from "flowbite-svelte";
    import {
        CheckCircleSolid,
        ExclamationCircleSolid,
    } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let toast: ToastState = { showToast: false, message: "", type: "green" };

    // Automatically update `toast` when `toastStore` changes
    $: toast = $toastStore;
    $: if (toast.message !== "") {
        toastStore.set({ type: "", message: "", showToast: false });
    }

    onMount(() => {
        tasksAPIs.getAllTasks();
        // Set up an interval to check the token every 5 seconds
        setInterval(AuthAPIs.checkAndRefreshToken, 5000);
    });
</script>

<div class="h-full">
    <Home />
    <Toast
        toastStatus={toast.showToast}
        position="top-right"
        color={toast.type}
    >
        <svelte:fragment slot="icon">
            {#if toast.type === "red"}
                <ExclamationCircleSolid class="w-5 h-5" />
            {/if}
            {#if toast.type === "green"}
                <CheckCircleSolid color="green" class="w-5 h-5" />
            {/if}
            <span class="sr-only">Warning icon</span>
        </svelte:fragment>
        {toast.message}
    </Toast>
</div>
