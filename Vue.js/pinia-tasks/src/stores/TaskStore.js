import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),

  getters: {
    favs () {
      return this.tasks.filter(t => t.isFav)
    },
    favCount () {
      return this.favs.length
    },
    totalCount (state) {
      return state.tasks.length
    }
  },

  actions: {
    // GET
    async getTasks () {
      this.isLoading = true
      try {
        const res = await fetch('http://localhost:3000/tasks')
        this.tasks = await res.json()
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },

    // ADD
    async addTask (task) {
      try {
        const res = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' }
        })
        const savedTask = await res.json()
        this.tasks.push(savedTask)
      } catch (err) {
        console.log(err)
      }
    },

    // DELETE
    async deleteTask (id) {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Delete failed')
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (err) {
        console.log(err)
      }
    },

    // TOGGLE FAV
    async toggleFav (id) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return

      const updated = { ...task, isFav: !task.isFav }

      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isFav: updated.isFav }),
          headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok) throw new Error('Toggle failed')
        task.isFav = updated.isFav
      } catch (err) {
        console.log(err)
      }
    }
  }
})
