<template>
  <div class="task">
    <h3>{{ task.title }}</h3>

    <div class="icons">
      <i
        class="material-icons"
        @click="taskStore.deleteTask(task.id)"
      >
        delete
      </i>

      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
      >
        {{ task.isFav ? 'favorite' : 'favorite_border' }}
      </i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore'

export default {
  props: ['task'],
  setup () {
    const taskStore = useTaskStore()
    return { taskStore }
  }
}
</script>

<style scoped>
.material-icons {
  cursor: pointer;
  color: gray;
}

.material-icons.active {
  color: red;
}
</style>
