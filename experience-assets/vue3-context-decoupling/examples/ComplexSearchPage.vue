<script setup>
import { onMounted, reactive, ref } from 'vue'

import {
  AipdSearchPagination,
  createAipdSearch,
} from '@/shared/aipd/aipd-search'
import KeywordFilter from './KeywordFilter.vue'

const rows = ref([])
const loadError = ref('')
const page = reactive({ pageNo: 1, pageSize: 20 })
const { pro_searchController } = createAipdSearch()

pro_searchController
  .registerPagination(new AipdSearchPagination({
    getPostValue: () => ({ ...page }),
    updatePagination: (patch) => Object.assign(page, patch),
  }))
  .onSearch(async ({ filters, pagination }) => {
    const request = { ...filters.KeywordFilter, ...pagination }
    // rows.value = await api.list(request)
    rows.value = [request]
  })

onMounted(async () => {
  try {
    await pro_searchController.initialize()
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : String(error)
  }
})
</script>

<template>
  <KeywordFilter />
  <button type="button" @click="pro_searchController.triggerSearch()">Search</button>
  <p v-if="loadError" role="alert">{{ loadError }}</p>
  <pre>{{ rows }}</pre>
</template>
