<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ISelectOption } from './interfaces/ISelectOption'
import ESelectItem from './e-select-item.vue'
import EIconArrow from './icons/e-Icon-arrow.vue'

const emit = defineEmits(['update:modeValue'])
const dropDown = ref()
const selected = defineModel('selected', { type: String, default: '' })
const isDropDownVisible = ref(false)

const closeDropDown = (element: object) => {
  if (!('target' in element)) {
    return
  }
  if (!dropDown.value.contains(element.target)) {
    isDropDownVisible.value = false
  }
}

const props = defineProps({
  options: {
    type: Array as () => ISelectOption[],
    required: false,
    default() {
      return []
    },
  },
  isLoading: {
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
  placeholder: {
    type: String,
    requirde: false,
    default() {
      return ''
    },
  },
  isError: {
    type: Boolean,
    requirde: false,
    default() {
      return false
    },
  },
})

function toggleOptionSelect(option: ISelectOption) {
  selected.value = option.value
  emit('update:modeValue', option.value)
  isDropDownVisible.value = false
}

function DropDownOpen() {
  if (props.disabled || props.isLoading) {
    return
  }
  isDropDownVisible.value = !isDropDownVisible.value
}

onMounted(() => {
  window.addEventListener('click', closeDropDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown)
})
</script>

<template>
  <div ref="dropDown" class="e-select">
    <div
      class="e-select__dropdown"
      :isDropDownVisible="isDropDownVisible"
      :disable="props.disabled || props.isLoading"
      :selcted="selected"
      @click="DropDownOpen"
    >
      {{ props.options.find(x => x.value === selected)?.label || placeholder }}
      <EIconArrow class="icon" />
    </div>
    <div v-if="isDropDownVisible" class="e-select__options">
      <div :class="{ scrollView: true, scroll: props.options.length > 5 }">
        <ESelectItem
          v-for="(option, index) in props.options"
          :key="index"
          :options="props.options"
          :label="option.label"
          :selected="option.value === selected"
          @click="toggleOptionSelect(option)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.e-select {
  display: block;
  min-width: 50px;
  font-size: 16px;

  .e-select__dropdown {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: -webkit-fill-available;
    height: 30px;
    padding: 12px;
    cursor: pointer;
    row-gap: 2px;

    .icon {
      fill: rgb(0 0 0 / 70%);
      transform: rotate(0deg);
    }

    &:not([selected='']) {
      border: 4px;
      border: 2px solid rgb(0 0 0 / 30%);
      background-color: rgb(233, 233, 233);
      color: rgb(0 0 0 / 65%);
    }

    &:hover:not([isDropDownVisible='true']) {
      border: 4px;
      border: 2px solid rgb(0 0 0 / 30%);
    }

    &[isDropDownVisible='true'] {
      border: 4px;
      border: 2px solid rgb(0 0 0 / 30%);

      .icon {
        transform: rotate(180deg);
      }
    }

    &[disabled='true'] {
      border: 2px solid rgb(0 0 0 / 30%);
      cursor: default;

      &:hover {
        border: 2px solid rgb(0 0 0 / 30%);
      }
    }
  }

  .e-select__options {
    position: absolute;
    z-index: 1;
    min-width: 240px;
    max-width: 400px;
    height: auto;
    margin-top: 4px;
    background: #fff;
    border-radius: 4px;
    border: 2px solid rgb(0 0 0 / 30%);
    row-gap: 0px;

    .scrollview {
      max-height: 300px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        width: 6px;
        border-radius: 12px;
      }

      &::-webkit-scrollbar-thumb {
        width: 6px;
        background: rgb(0 0 0 / 32%);
        border-radius: 12px;
      }
    }

    .scroll {
      padding-right: 4px;
      overflow-y: scroll;
    }
  }
}
</style>
