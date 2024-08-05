<script lang="ts">
    import { Input, Label, Button, Img } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import AuthAPIs from "$lib/services/auth";
    import toastStore from "$lib/stores/toast";

    let username: string = "";
    let password: string = "";

    const handleCrendentials = async () => {
        let data = { email: username, password: password };
        let result = await AuthAPIs.loginUser(data);
        if (result.type) {
            goto("/home");
        } else {
            toastStore.set({
                type: "red",
                message: result.message,
                showToast: true
            })
        }
    };
</script>

<div
    class="flex flex-col bg-custom-black justify-center md:flex-row w-full min-h-screen"
>
    <!-- Left 60% with Background Image and Centered Content for md and larger screens -->
    <div
        class="w-full md:w-3/5 bg-half flex items-center justify-center hidden md:flex"
    >
        <div class="text-white text-center">
            <!-- <h1 class="text-4xl font-bold font-inter text-custom-orange">Task Management App</h1> -->
        </div>
    </div>

    <!-- Right 40% with Form, full width on small screens -->
    <div
        class="w-full md:w-2/5 flex items-center justify-center bg-custom-black"
    >
        <div class="bg-custom-gray p-8 md:rounded-lg shadow-lg w-full max-w-md">
            <div class="flex items-center justify-center mb-2">
                <Img
                    src="https://framerusercontent.com/images/aajC1oplLY8jQdIb7zwDUWhig.png"
                    alt="logo"
                    imgClass="w-12 h-12"
                />
            </div>
            <form on:submit={() => handleCrendentials()}>
                <div class="mb-4">
                    <Label
                        for="user_name"
                        class="block mb-2 text-md font-medium text-white"
                        >Username</Label
                    >
                    <Input
                        type="text"
                        id="user_name"
                        placeholder="John Doe"
                        bind:value={username}
                        required
                        class="block w-full p-2 border-custom-black text-white bg-custom-black rounded-md"
                    />
                </div>
                <div class="mb-6">
                    <Label
                        for="password"
                        class="block mb-2 text-md font-medium text-white"
                        >Password</Label
                    >
                    <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        bind:value={password}
                        required
                        class="block w-full p-2 border-custom-black text-white bg-custom-black rounded-md"
                    />
                </div>
                <Button
                    type="submit"
                    class="w-full customColor text-white p-2 rounded-md"
                    >Login</Button
                >
                <h4 class="text-center pt-4 text-sm text-white">
                    Powered by Robotspace
                </h4>
            </form>
        </div>
    </div>
</div>

<style>
    .bg-half {
        background-image: url("https://framerusercontent.com/images/dPHkQ5GKC9RRVH4Y50LzC5nMUmg.jpg");
        background-size: cover;
        background-position: center;
    }
</style>
