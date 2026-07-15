import { inject } from 'vue'

export const AIPD_MODAL_BOX_CONTROLLER = Symbol('AipdModalBoxController')

export function useAipdModalBox() {
  const pro_controller = inject(AIPD_MODAL_BOX_CONTROLLER, null)

  if (!pro_controller) {
    throw new Error('useAipdModalBox requires content rendered by AipdModalBox')
  }

  return { pro_controller }
}
