<script setup lang="ts">
import type { PropType } from 'vue/dist/vue.js'
import EListItem from './e-list-item.vue'

const slots = defineSlots<{
  default?: () => unknown
}>()

const props = defineProps({
  items: {
    type: Object as PropType<{ id: number; label: string }[]>,
    required: true,
  },
})
</script>

<template>
  <div class="e-list-items">
    <EListItem
      v-for="(item, index) in props.items"
      :key="index"
      :id="item.id"
      :label="item.label"
      @click="() => console.log(item.id)"
      class="e-list-items__item"
      >{{ item.label }}</EListItem
    >
  </div>
</template>

<style lang="scss" scoped>
.e-list-items {
  display: flex;
  flex-direction: column;
  padding: 0px;
  .e-list-items__item {
    margin: 4px 0;
    row-gap: 4px;
  }
}
</style>
