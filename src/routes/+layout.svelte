<script lang="ts">
    import "../app.css";

    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import tokenStore from "$lib/stores/auth";
    import { goto } from "$app/navigation";

    onMount(() => {
        const { token, expiresAt } = get(tokenStore);
        // Check if the token exists and is not expired
        if (token === "") {
            goto("login");
        }
    });
</script>

<slot></slot>
