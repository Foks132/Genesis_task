import { defineStore } from 'pinia'

export const useItemsDataStore = defineStore('itemsData', {
  state: () => ({
    /** @type {{ id: string, label: string }[]} */
    items: [] as Array<any>,
  }),
  getters: {
    allItems(state) {
      return state.items
    },
  },
  actions: {
    addItem(id: string, label: string) {
      if (id && label) {
        this.items.push({ id, label })
      }
    },
  },
})
