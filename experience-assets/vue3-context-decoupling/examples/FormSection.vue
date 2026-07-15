<script setup>
import { reactive, ref } from 'vue'

import { useAipdFormItem } from '@/shared/aipd/aipd-form'

defineOptions({ name: 'FormSection' })

const formRef = ref()
const model = reactive({ name: '' })

useAipdFormItem({
  getValue: () => model,
  getSubmitValue: () => ({ name: model.name.trim() }),
  validate: () => formRef.value?.reportValidity() ?? false,
  update: ({ suggestedName }) => {
    if (!model.name) model.name = suggestedName
  },
  clear: () => { model.name = '' },
  clearValidate: () => formRef.value?.clearValidate?.(),
})
</script>

<template>
  <form ref="formRef">
    <input v-model="model.name" required />
  </form>
</template>
