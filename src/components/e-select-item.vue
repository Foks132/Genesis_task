<script setup lang="ts">
import EIconArrow from './icons/e-Icon-arrow.vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default() {
      return ''
    },
  },
  selected: {
    type: Boolean,
    required: false,
    default() {
      return true
    },
  },
})
</script>

<template>
  <div class="e-select-item" :selected="props.selected">
    <div class="cotainer">
      <EIconArrow v-if="selected" class="icon" style="opacity: 0.8" />
    </div>
    {{ props.label }}
  </div>
</template>

<style scoped lang="scss">
.e-select-item {
  column-gap: 1px;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  height: 30px;
  border-radius: 0px;
  color: rgb(0 0 0 / 65%);
  cursor: pointer;

  .cotainer {
    width: 20px;
    display: flex;
    align-items: center;
  }

  &[selected='true'] {
    background-color: rgb(0 0 0 / 12%);
    border-radius: 2px;
  }

  &:hover:not([selected='true']) {
    background-color: rgb(0 0 0 / 12%);
  }
}
</style>
