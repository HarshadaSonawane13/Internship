<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="I need to..."
      v-model="newTask"
    />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

export default {
  setup () {
    const taskStore = useTaskStore()
    const newTask = ref('')

    const handleSubmit = () => {
      if (newTask.value.trim()) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false
        })
        newTask.value = ''
      }
    }

    return { newTask, handleSubmit }
  }
}
</script>
