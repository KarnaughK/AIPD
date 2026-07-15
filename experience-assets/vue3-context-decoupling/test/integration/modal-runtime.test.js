import assert from 'node:assert/strict'
import test from 'node:test'

import { JSDOM } from 'jsdom'

test('AipdOverlay inherits app provide and destroy removes its mount point', async () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>')
  const globals = {
    window: dom.window,
    document: dom.window.document,
    Node: dom.window.Node,
    Element: dom.window.Element,
    HTMLElement: dom.window.HTMLElement,
    SVGElement: dom.window.SVGElement,
  }
  Object.assign(globalThis, globals)

  try {
    const { createApp, defineComponent, h, inject, nextTick, onUnmounted } = await import('vue')
    const { AipdOverlay } = await import('../../src/aipd-modal-box/AipdOverlay.js')
    const {
      clearAipdModalBoxAppContext,
      setAipdModalBoxAppContext,
    } = await import('../../src/aipd-modal-box/appContext.js')
    const { useAipdModalBox } = await import('../../src/aipd-modal-box/context.js')

    const appToken = Symbol('app-token')
    let injectedValue
    let contentController
    let closePayload

    const app = createApp({ render: () => null })
    app.provide(appToken, 'from-main-app')
    setAipdModalBoxAppContext(app._context)

    const Content = defineComponent({
      setup() {
        injectedValue = inject(appToken)
        contentController = useAipdModalBox().pro_controller
        onUnmounted(() => contentController.close({ source: 'unmounted' }))
        return () => h('div', 'content')
      },
    })
    const FakeOverlay = defineComponent({
      props: { modelValue: Boolean },
      setup(_props, { slots }) {
        return () => h('section', slots.default?.())
      },
    })
    const overlay = new AipdOverlay({
      contentComponent: Content,
      overlayComponent: FakeOverlay,
    })

    const childCountBefore = document.body.children.length
    const controller = overlay.show({}, {
      callbacks: { close: (payload) => { closePayload = payload } },
    })
    await nextTick()

    assert.equal(injectedValue, 'from-main-app')
    assert.equal(contentController, controller)
    assert.equal(document.body.children.length, childCountBefore + 1)

    controller.destroy({ source: 'destroy' })
    await nextTick()
    assert.deepEqual(closePayload, { source: 'destroy' })
    assert.equal(document.body.children.length, childCountBefore)
    clearAipdModalBoxAppContext()
  } finally {
    dom.window.close()
    for (const key of Object.keys(globals)) delete globalThis[key]
  }
})
