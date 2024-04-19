<template>
    <div class="new-task">
        <router-link to="/task-list">Task List</router-link>
        <h2>Create Task</h2>
        <form @submit.prevent="createTask">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="newTask.title" required />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="newTask.description"></textarea>
            </div>
            <div class="form-group">
                <label for="priority">Priority:</label>
                <select id="priority" v-model="newTask.priority" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit">Create Task</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    beforeEnter(to, from, next) {
        const token = localStorage.getItem('token');
        if (!token) {
            next('/login');
        } else {
            next();
        }
    },
    data() {
        return {
            newTask: {
                title: "",
                description: "",
                priority: "medium",
            },
        };
    },
    methods: {
        async createTask() {
            try {
                const token = localStorage.getItem("token");
                const apiUrl = import.meta.env.VITE_APP_API_URL;

                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.post(
                    `${apiUrl}/api/tasks`,
                    this.newTask,
                    { headers: headers }
                );

                this.$router.push("/task-list");
            } catch (error) {
                console.error("Error creating task:", error);
            }
        },
    },
};
</script>

<style scoped>
.new-task {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input[type="text"],
textarea,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>