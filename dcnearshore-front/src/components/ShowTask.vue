<template>
    <div class="show-task">
        <router-link to="/task-list">Task List</router-link>
        <h2>Task Details</h2>
        <div class="task-details">
            <p><strong>Title:</strong> {{ task.title }}</p>
            <p><strong>Description:</strong> {{ task.description }}</p>
            <p><strong>Completed:</strong> {{ task.completed ? 'Yes' : 'No' }}</p>
            <p><strong>Priority:</strong> {{ task.priority }}</p>
            <p><strong>Created At:</strong> {{ task.created_at }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            task: {},
        };
    },
    methods: {
        async fetchTask() {
            try {
                const taskId = this.$route.params.id;
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${apiUrl}/api/tasks/${taskId}`, {
                    headers: headers,
                });
                this.task = response.data;
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
.show-task {
    max-width: 600px;
    margin: 0 auto;
}

.task-details {
    margin-top: 20px;
}

.task-details p {
    margin-bottom: 10px;
}
</style>