// src/stores/auth.ts
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Define the shape of the auth state
export interface AuthState {
  token: string;
  expiresAt: number;
  refreshToken: string;
}

// Function to get the initial auth state from localStorage
function getInitialAuthState(): AuthState {
  if (typeof localStorage !== 'undefined') {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  }
  return {
    token: '',
    expiresAt: 0,
    refreshToken: ''
  };
}

// Create a writable store with the initial state
const initialAuthState = getInitialAuthState();
const tokenStore: Writable<AuthState> = writable(initialAuthState);

// Subscribe to changes and save to localStorage
tokenStore.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('auth', JSON.stringify(value));
  }
});

export default tokenStore;
