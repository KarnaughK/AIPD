<script setup>
import { reactive } from 'vue'

import { AipdModalHeader, useAipdModalBox } from '@/shared/aipd/aipd-modal-box'

const props = defineProps({
  recordId: {
    type: Number,
    required: true,
  },
})

const form = reactive({ title: '' })
const { pro_controller } = useAipdModalBox()

async function save() {
  // await api.save({ id: props.recordId, ...form })
  pro_controller.close({ saved: true, id: props.recordId })
}
</script>

<template>
  <AipdModalHeader title="Edit record" />
  <main>
    <input v-model="form.title" />
    <button type="button" @click="save">Save</button>
  </main>
</template>
