import { goto } from "$app/navigation";
import { Auth } from "$lib/interceptors/axios";
import tokenStore from "$lib/stores/auth";
import { jwtDecode } from "jwt-decode";
import { get } from "svelte/store";

interface Data {
    email: string;
    password: string;
}

const loginUser = async (payload: Data) => {
    try {
        const response = await Auth.post('login', payload);
        const { data } = response;
        const authObj = {
            token: data.access_token,
            expiresAt: data.expires,
            refreshToken: data.refresh_token
        };
        tokenStore.set(authObj);
        return { type: true, message: "" };
    } catch (error: any) {
        return { type: false, message: error.response.data.errors[0].message };
    }
};

const rotateToken = async () => {
    try {
        const { refreshToken } = get(tokenStore);
        if (refreshToken) {
            const response = await Auth.post("refresh", { "refresh_token": refreshToken });
            const { data } = response;
            const authObj = {
                token: data.access_token,
                expiresAt: data.expires,
                refreshToken: data.refresh_token
            };
            tokenStore.set(authObj);
        }
    } catch (error: any) {
        return error;
    }
}

const logoutUser = async () => {
    try {
        let { refreshToken } = get(tokenStore);
        await Auth.post('logout', { "refresh_token": refreshToken, "mode": "json" });
        tokenStore.set({ token: '', expiresAt: 0, refreshToken: '' });
        return true;
    } catch (error: any) {
        return error;
    }
}

// Function to check if the token needs to be refreshed
const checkAndRefreshToken = async () => {
    const { token } = get(tokenStore);
    if (token !== "") {
        const expiryTime: any = jwtDecode(token);
        let timeLeft = expiryTime.exp - (Date.now() / 1000);
        switch (true) {
            case timeLeft > 0 && timeLeft <= 10:
                await rotateToken();
                break;
            case timeLeft < 0:
                tokenStore.set({
                    token: '',
                    expiresAt: 0,
                    refreshToken: ''
                });
                goto("/login");
                break;
            default:
                break;
        }
    }
}

const AuthAPIs = { loginUser, rotateToken, logoutUser, checkAndRefreshToken };

export default AuthAPIs;