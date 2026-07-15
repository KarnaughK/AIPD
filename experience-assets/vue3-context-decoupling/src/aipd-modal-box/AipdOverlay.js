import { createVNode, h, provide, ref, render } from 'vue'

import { requireAipdModalBoxAppContext } from './appContext.js'
import { AIPD_MODAL_BOX_CONTROLLER } from './context.js'
import { createOverlaySession, parseShowOptions } from './session.js'

function callIfFunction(callback, ...args) {
  if (typeof callback === 'function') callback(...args)
}

export class AipdOverlay {
  constructor({ contentComponent, overlayComponent, defaultConfig = {}, className = '' }) {
    if (!contentComponent) throw new TypeError('AipdOverlay requires contentComponent')
    if (!overlayComponent) throw new TypeError('AipdOverlay requires overlayComponent')

    this.contentComponent = contentComponent
    this.overlayComponent = overlayComponent
    this.defaultConfig = defaultConfig
    this.className = className
  }

  show(props = {}, options = {}) {
    if (typeof document === 'undefined') {
      throw new Error('AipdModalBox can only open in a browser client context')
    }
    const appContext = requireAipdModalBoxAppContext()

    const invocation = parseShowOptions(options)
    const session = createOverlaySession(invocation.callbacks)
    const visible = ref(true)
    const mountPoint = document.createElement('div')
    let cleaned = false

    const config = {
      ...this.defaultConfig,
      ...invocation.callConfig,
    }
    const userOnClosed = config.onClosed
    const userOnUpdateModelValue = config['onUpdate:modelValue']

    delete config.onClosed
    delete config['onUpdate:modelValue']

    const cleanup = () => {
      if (cleaned) return
      cleaned = true
      try {
        render(null, mountPoint)
      } finally {
        mountPoint.remove()
      }
    }

    const controller = {
      update(payload) {
        session.update(payload)
      },
      close(payload) {
        visible.value = false
        session.close(payload)
      },
      destroy(payload) {
        try {
          session.close(payload)
        } finally {
          cleanup()
        }
      },
    }

    const wrapperVNode = createVNode({
      name: 'AipdModalBoxHost',
      setup: () => {
        provide(AIPD_MODAL_BOX_CONTROLLER, controller)

        return () => h(
          this.overlayComponent,
          {
            ...config,
            class: [this.className, config.class],
            modelValue: visible.value,
            'onUpdate:modelValue': (value) => {
              visible.value = value
              callIfFunction(userOnUpdateModelValue, value)
              if (!value) session.close(undefined)
            },
            onClosed: (...args) => {
              try {
                session.close(undefined)
              } finally {
                cleanup()
                callIfFunction(userOnClosed, ...args)
              }
            },
          },
          { default: () => h(this.contentComponent, props) },
        )
      },
    })

    wrapperVNode.appContext = appContext

    document.body.appendChild(mountPoint)
    try {
      render(wrapperVNode, mountPoint)
    } catch (error) {
      cleanup()
      throw error
    }

    return invocation.mode === 'promise' ? session.promise : controller
  }
}
