<script lang="ts">
    import { goto } from "$app/navigation";
    import AuthAPIs from "$lib/services/auth";
    import { Avatar, Dropdown, DropdownItem, Img } from "flowbite-svelte";

    const handleLogOut = async () => {
        let result = await AuthAPIs.logoutUser();
        if (result) {
            localStorage.clear();
            goto("/login");
        }
    };
</script>

<div class="home">
    <header
        class="shadow-custom-black bg-custom-black h-16 flex justify-between px-4 sm:px-6 items-center shadow-lg w-full"
    >
        <div class="flex items-center gap-2">
            <Img
                src="https://framerusercontent.com/images/aajC1oplLY8jQdIb7zwDUWhig.png"
                alt="logo"
                imgClass="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 class="text-white text-lg sm:text-2xl">Task Management App</h1>
        </div>
        <div>
            <Avatar id="user-drop" border size="sm" class="cursor-pointer" />
            <Dropdown containerClass="bg-white p-2" triggeredBy="#user-drop">
                <DropdownItem
                    defaultClass="bg-white text-black font-semibold px-2"
                    on:click={() => handleLogOut()}
                >
                    Log out
                </DropdownItem>
            </Dropdown>
        </div>
    </header>
    <main class="bg-gradient-to-r p-2 bg-gray-900 custom-height">
        <slot />
    </main>
</div>

<style>
    @media (max-width: 640px) {
        header {
            padding: 16px;
        }
        header h1 {
            font-size: 1rem;
        }
    }
</style>
