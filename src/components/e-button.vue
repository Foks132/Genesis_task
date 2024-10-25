<script setup lang="ts">
import type { PropType } from 'vue'
import EIconLoad from './icons/e-Icon-load.vue'

const emit = defineEmits(['click'])
const slots = defineSlots<{
  default?: () => unknown
  icon?: () => unknown
}>()

const props = defineProps({
  type: {
    type: String as PropType<'default-primary'>,
    required: false,
    default() {
      return 'default-primary'
    },
  },
  loading: {
    type: Boolean,
    required: false,
    default() {
      return false
    },
  },
  disabled: {
    type: Boolean,
    required: false,
    default() {
      return false
    },
  },
})

function onClick(payload: MouseEvent): void {
  emit('click', payload)
}
</script>

<template>
  <button
    class="e-button"
    :disabled="props.disabled"
    :loading="props.loading"
    :class="`e-button--${props.type}`"
    @click="onClick"
  >
    <i v-if="slots.icon" class="e-button__icon"><slot name="icon"></slot></i>
    <div v-if="loading" :loading="props.loading" class="e-button__loading">
      <EIconLoad />
    </div>
    <p v-else-if="slots.default" class="e-button__text"><slot></slot></p>
  </button>
</template>

<style lang="scss" scoped>
.e-button {
  display: flex;
  height: 30px;
  border: none;
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
  min-width: 36px;
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
  column-gap: 4px;
  border-radius: 4px;
  border: 2px solid rgb(0 0 0 / 30%);
  cursor: pointer;

  &:disabled {
    cursor: default;
    color: rgb(0 0 0 / 90%);
    background-color: rgb(233, 233, 233);
    opacity: 0.9;
  }

  &[loading='true'] {
    cursor: progress;
    .e-button__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      animation: button-loading-spinner 1s ease infinite;
      animation-name: rotation;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      content: '';
    }
  }

  .e-button__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
  }

  .e-button__text {
    padding: 0 4px;
    text-wrap: nowrap;
  }
}

.e-button--default-primary {
  color: #fff;
  background-color: rgb(76, 139, 247);

  &:hover:not([disabled]):not([loading='true']) {
    background-color: rgb(76 139 247 / 70%);
  }

  &:active:not([disabled]):not([loading='true']) {
    background-color: rgb(76 139 247 / 70%);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
