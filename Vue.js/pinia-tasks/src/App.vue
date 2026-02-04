<template>
  <main>
    <header>
      <img src="./assets/pinia.jpg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- LOADING -->
    <div class="loading" v-if="taskStore.isLoading">
      Loading tasks...
    </div>

    <!-- ALL TASKS -->
    <div class="task-list" v-if="!taskStore.isLoading && filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- FAV TASKS -->
    <div class="task-list" v-if="!taskStore.isLoading && filter === 'favs'">
      <p>Fav tasks</p>
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs" :key="'fav-' + task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset</button>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from './stores/TaskStore'
import TaskDetails from './Components/TaskDetails.vue'
import TaskForm from './Components/TaskForm.vue'

export default {
  components: {
    TaskDetails,
    TaskForm
  },
  setup(){
    const taskStore = useTaskStore()
    taskStore.getTasks()
    const filter=ref('all')

    return { taskStore, filter }
  }
}
</script>

<style scoped>
button{
  margin: 10px;
}
</style>

