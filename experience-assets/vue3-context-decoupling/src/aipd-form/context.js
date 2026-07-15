import { getCurrentInstance, inject, onScopeDispose, provide } from 'vue'

import { AipdFormController } from './AipdFormController.js'
import { AipdFormItem } from './AipdFormItem.js'

export const AIPD_FORM_CONTEXT = Symbol('AipdFormContext')

export function createAipdForm(controller = new AipdFormController()) {
  if (!(controller instanceof AipdFormController)) {
    throw new TypeError('createAipdForm requires an AipdFormController')
  }

  const context = { pro_formController: controller }
  provide(AIPD_FORM_CONTEXT, context)
  return context
}

export function useAipdForm() {
  const context = inject(AIPD_FORM_CONTEXT, null)
  if (!context?.pro_formController) {
    throw new Error('useAipdForm requires createAipdForm in the current component scope')
  }
  return context
}

export function useAipdFormItem(options = {}) {
  const { pro_formController } = useAipdForm()
  const componentName = getCurrentInstance()?.type?.name
  const item = new AipdFormItem({
    ...options,
    itemName: options.itemName || componentName,
  })

  pro_formController.registerItem(item)
  onScopeDispose(() => pro_formController.unregisterItem(item))

  return { item, pro_formController }
}
