<script setup>
import { ref } from 'vue'

import { useAipdSearchFilter } from '@/shared/aipd/aipd-search'

defineOptions({ name: 'KeywordFilter' })

const keyword = ref('')
const { pro_searchController } = useAipdSearchFilter({
  getValue: () => keyword.value,
  getPostValue: () => ({ keyword: keyword.value.trim() }),
  clear: () => { keyword.value = '' },
})
</script>

<template>
  <input v-model="keyword" @keyup.enter="pro_searchController.triggerSearch()" />
</template>
