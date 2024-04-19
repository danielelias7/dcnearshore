<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="email" placeholder="Enter your email" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your password" />
            </div>
            <button type="submit" class="btn-login">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const { data } = await axios.post(`${apiUrl}/api/login`, {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem("token", data.token);
                this.$router.push("/task-list");
            } catch (error) {
                console.error("Error during login:", error);
                this.error = "Invalid email or password. Please try again.";
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px !important;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.login-container h1 {
    text-align: center;
    margin-bottom: 20px;
}

.login-form .form-group {
    margin-bottom: 15px;
}

.login-form label {
    display: block;
    margin-bottom: 5px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.btn-login {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.btn-login:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>