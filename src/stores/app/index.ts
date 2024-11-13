import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    todo: [] as number[],
  }),
  actions: {
    async doSomething() {
      this.todo = [1, 2, 3]
    },
  },
})
