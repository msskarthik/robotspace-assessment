// src/stores/auth.ts
import type { ColorVariant } from 'flowbite-svelte';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Define the shape of the toast state
export interface ToastState {
    showToast: boolean;
    message: string;
    type: ColorVariant | any;
}

// Create a writable store with the initial state
const initialToastState = { showToast: false, message: "", type: "red" };
const toastStore: Writable<ToastState> = writable(initialToastState);

export default toastStore;
