import { getCurrentInstance, inject, onScopeDispose, provide } from 'vue'

import { AipdSearchController } from './AipdSearchController.js'
import { AipdSearchFilter } from './AipdSearchFilter.js'

export const AIPD_SEARCH_CONTEXT = Symbol('AipdSearchContext')

export function createAipdSearch(controller = new AipdSearchController()) {
  if (!(controller instanceof AipdSearchController)) {
    throw new TypeError('createAipdSearch requires an AipdSearchController')
  }
  const context = { pro_searchController: controller }
  provide(AIPD_SEARCH_CONTEXT, context)
  return context
}

export function useAipdSearch() {
  const context = inject(AIPD_SEARCH_CONTEXT, null)
  if (!context?.pro_searchController) {
    throw new Error('useAipdSearch requires createAipdSearch in the current component scope')
  }
  return context
}

export function useAipdSearchFilter(options = {}) {
  const { pro_searchController } = useAipdSearch()
  const componentName = getCurrentInstance()?.type?.name
  const filter = new AipdSearchFilter({
    ...options,
    filterName: options.filterName || componentName,
  })

  pro_searchController.registerFilter(filter)
  onScopeDispose(() => pro_searchController.unregisterFilter(filter))

  return { filter, pro_searchController }
}
