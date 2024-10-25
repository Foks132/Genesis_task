import type { ISelectOption } from '@/components/interfaces/ISelectOption'
import { defineStore } from 'pinia'

export const useOptionsDataStore = defineStore('optionsData', {
  state: () => ({
    /** @type {{ label: string, value: string }[]} */
    options: [
      { label: 'Сделка', value: 'order' },
      { label: 'Контакт', value: 'contact' },
      { label: 'Компания', value: 'company' },
    ] as Array<ISelectOption>,
  }),
  getters: {
    allOptions(state) {
      return state.options
    },
  },
})
