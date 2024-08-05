<script lang="ts">
    import Login from "$lib/components/login/Login.svelte";
    import type { ToastState } from "$lib/stores/toast";
    import toastStore from "$lib/stores/toast";
    import { Toast } from "flowbite-svelte";
    import { CheckCircleSolid, ExclamationCircleSolid } from "flowbite-svelte-icons";

    let toast: ToastState = { showToast: false, message: "", type: "green" };

    // Automatically update `toast` when `toastStore` changes
    $: toast = $toastStore;
    $: if (toast.message !== "") {
        toastStore.set({ type: "", message: "", showToast: false });
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Login />
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
