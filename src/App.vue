<script setup lang="ts">
import { ref } from 'vue'
import { useOptionsDataStore } from './stores/optionsData'
import { useItemsDataStore } from './stores/itemsData'
import { storeToRefs } from 'pinia'
import EButton from './components/e-button.vue'
import ESelect from './components/e-select.vue'
import EList from './components/e-list.vue'
import axios from 'axios'

const itemsDataStore = useItemsDataStore()
const { items } = storeToRefs(itemsDataStore)

const isLoading = ref(false)
const selectedItem = ref()
const optionsDataStore = useOptionsDataStore()
const { options } = storeToRefs(optionsDataStore)

function addItem(id: string, label: string) {
  if (!id && !label) {
    return
  }
  itemsDataStore.addItem(id, label)
}

async function Create(value: string): Promise<void> {
  try {
    isLoading.value = true
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_URL}/${value}`,
      {
        name: 'Test',
      },
      {
        headers: {
          'Content-Type': 'contenttype=application/json',
        },
      },
    )
    console.log(response)
    addItem(response.data, value)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Request failed with status ${error.response?.status}`)
    } else {
      console.error(`An error occurred: ${error}`)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Genesis Task</h1>
      <div style="width: 250px">
        <ESelect
          class="block"
          :options="options"
          placeholder="Не выбрано"
          v-model:selected="selectedItem"
        ></ESelect>
        <EButton
          class="block"
          :disabled="selectedItem == undefined"
          :loading="isLoading"
          v-on:click="Create(selectedItem)"
          >Сохранить</EButton
        >
        <EList class="block" :items="items"></EList>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;

  .block {
    margin: 5px;
    width: -webkit-fill-available;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
