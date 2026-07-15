<script setup>
import { createAipdForm } from '@/shared/aipd/aipd-form'
import FormSection from './FormSection.vue'

const { pro_formController } = createAipdForm()

async function submit() {
  const validation = await pro_formController.validate()
  if (!validation.valid) return

  const section = await pro_formController.getSubmitValue(FormSection)
  const request = { ...section }
  // await api.save(request)
  console.info(request)
}
</script>

<template>
  <FormSection />
  <button type="button" @click="submit">Submit</button>
</template>
