<script setup lang="ts">
const slots = defineSlots<{
  default?: () => unknown
}>()
const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="e-list-item">
    <label class="e-list-item__label">{{ props.id }}</label>
    <label v-if="slots.default" class="e-list-item__label"><slot></slot></label>
  </div>
</template>

<style lang="scss" scoped>
.e-list-item {
  display: flex;
  padding: 6px;
  border: 2px solid rgb(255 255 255 / 30%);
  background-color: rgba(255, 255, 255, 0);
  opacity: 0.9;
  column-gap: 4px;
  border-radius: 4px;
  width: 240px;
  .e-list-item__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 4px;
    font-size: 14px;
    text-transform: uppercase;
    color: rgb(255, 255, 255);
  }
}
</style>
