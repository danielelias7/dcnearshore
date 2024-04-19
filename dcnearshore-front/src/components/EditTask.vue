<template>
    <div class="edit-task">
        <router-link to="/task-list">Task List</router-link>
        <h2>Edit Task</h2>
        <form @submit.prevent="updateTask">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="editedTask.title" required />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="editedTask.description"></textarea>
            </div>
            <div class="form-group">
                <label for="priority">Priority:</label>
                <select id="priority" v-model="editedTask.priority" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label for="completed">Completed:</label>
                <input type="checkbox" id="completed" v-model="editedTask.completed" />
            </div>
            <button type="submit">Update Task</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            editedTask: {
                title: "",
                description: "",
                priority: "",
                completed: false,
            },
        };
    },
    methods: {
        async updateTask() {
            try {
                const token = localStorage.getItem("token");
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const taskId = this.$route.params.id;

                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.put(
                    `${apiUrl}/api/tasks/${taskId}`,
                    this.editedTask,
                    { headers: headers }
                );

                this.$router.push("/task-list");
            } catch (error) {
                console.error("Error updating task:", error);
            }
        },
        async fetchTask() {
            try {
                const token = localStorage.getItem("token");
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const taskId = this.$route.params.id;

                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${apiUrl}/api/tasks/${taskId}`, {
                    headers: headers,
                });
                this.editedTask = response.data;
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        },
    },
    mounted() {
        this.fetchTask();
    },
};
</script>

<style scoped>
.edit-task {
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