<script setup>
import { useAipdModalBox } from './context.js'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const { pro_controller } = useAipdModalBox()
</script>

<template>
  <header class="aipd-modal-box__header">
    <div class="aipd-modal-box__title">{{ title }}</div>
    <button
      aria-label="Close"
      class="aipd-modal-box__close"
      type="button"
      @click="pro_controller.close()"
    >
      ×
    </button>
  </header>
</template>

<style scoped>
.aipd-modal-box__close {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  padding: 4px;
}
</style>
