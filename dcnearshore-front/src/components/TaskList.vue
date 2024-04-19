<template>
    <div class="task-list">
        <!-- New Task-->
        <router-link to="/new-task">Add New Task</router-link>
        <button @click="logout()">Logout</button>

        <!-- Filters -->
        <div class="filters">
            <input type="text" v-model="filters.title" placeholder="Title" class="form-input" />
            <select v-model="filters.priority" class="form-select">
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select v-model="filters.completed" class="form-select">
                <option value="">Completed</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
            <button @click="fetchTasks" class="btn-apply-filters">
                Apply Filters
            </button>
        </div>

        <!-- Task list -->
        <ul class="task-list">
            <li v-for="task in tasks" :key="task.id" :style="{ color: task.completed ? 'red' : 'green' }">
                <!-- Details -->
                <router-link :to="{ name: 'show-task', params: { id: task.id } }"
                    :style="{ color: task.completed ? 'red' : 'green' }">
                    {{ task.title }}
                </router-link>
                <!-- Edit Task -->
                <router-link :to="{ name: 'edit-task', params: { id: task.id } }"
                    :style="{ color: 'blue' }">Editar</router-link>
                <!-- Delete Task -->
                <button @click="deleteTask(task.id)">Eliminar</button>
            </li>
        </ul>

        <!-- Paginate -->
        <div class="pagination">
            <button @click="fetchNextPage" :disabled="currentPage === lastPage" class="btn-pagination">
                Next
            </button>
            <span>{{ currentPage }} of {{ lastPage }}</span>
            <button @click="fetchPreviousPage" :disabled="currentPage === 1" class="btn-pagination">
                Previous
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            tasks: [],
            currentPage: 1,
            lastPage: 1,
            filters: {
                title: "",
                priority: "",
                completed: "",
            },
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await this.fetchData();
                this.tasks = response.data;
                this.currentPage = response.current_page;
                this.lastPage = response.last_page;
            } catch (error) {
                this.handleError(error);
            }
        },
        async fetchNextPage() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                await this.fetchTasks();
            }
        },
        async fetchPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                await this.fetchTasks();
            }
        },
        async fetchData() {
            this.checkToken();
            const apiUrl = import.meta.env.VITE_APP_API_URL;
            const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
            const params = { page: this.currentPage, ...this.filters };
            const response = await axios.get(`${apiUrl}/api/tasks`, { params, headers });
            return response.data;
        },
        async deleteTask(taskId) {
            try {
                this.checkToken();
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
                await axios.delete(`${apiUrl}/api/tasks/${taskId}`, { headers });
                await this.fetchTasks();
            } catch (error) {
                this.handleError(error);
            }
        },
        async logout() {
            try {
                this.checkToken();
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
                await axios.post(`${apiUrl}/api/logout`, {}, { headers });
                localStorage.removeItem("token");
                this.$router.push("/login");
            } catch (error) {
                this.handleError(error);
            }
        },
        checkToken() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push("/login");
                throw new Error("Token is missing");
            }
        },
        handleError(error) {
            console.error("Error:", error);
            // Aquí podrías mostrar un mensaje de error al usuario si es necesario
        },
    },
    mounted() {
        this.fetchTasks();
    },
};
</script>

<style scoped>
.task-list {
    max-width: 800px;
    margin: 0 auto;
}

.filters {
    margin-bottom: 20px;
}

.form-input,
.form-select,
.btn-apply-filters,
.btn-pagination {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.form-input {
    width: 200px;
}

.btn-apply-filters,
.btn-pagination {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    border: none;
}

.btn-apply-filters:hover,
.btn-pagination:hover {
    background-color: #0056b3;
}

.pagination {
    margin-top: 20px;
}

.pagination button {
    padding: 8px 16px;
}

.pagination span {
    margin: 0 10px;
}
</style>
