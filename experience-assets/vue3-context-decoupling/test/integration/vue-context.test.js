import assert from 'node:assert/strict'
import test from 'node:test'

import { createRenderer, defineComponent, h, nextTick, ref } from 'vue'

import { createAipdForm, useAipdFormItem } from '../../src/aipd-form/context.js'
import { createAipdSearch, useAipdSearchFilter } from '../../src/aipd-search/context.js'

function createHostNode(type, text = '') {
  return { type, text, children: [], parent: null, props: {} }
}

const renderer = createRenderer({
  patchProp(node, key, _previous, next) {
    node.props[key] = next
  },
  insert(node, parent, anchor = null) {
    node.parent = parent
    if (!anchor) parent.children.push(node)
    else parent.children.splice(parent.children.indexOf(anchor), 0, node)
  },
  remove(node) {
    if (!node.parent) return
    const index = node.parent.children.indexOf(node)
    if (index >= 0) node.parent.children.splice(index, 1)
    node.parent = null
  },
  createElement: (type) => createHostNode(type),
  createText: (text) => createHostNode('text', text),
  createComment: (text) => createHostNode('comment', text),
  setText(node, text) {
    node.text = text
  },
  setElementText(node, text) {
    node.text = text
    node.children = []
  },
  parentNode: (node) => node.parent,
  nextSibling(node) {
    if (!node.parent) return null
    const index = node.parent.children.indexOf(node)
    return node.parent.children[index + 1] || null
  },
  querySelector: () => null,
  setScopeId: () => undefined,
  cloneNode: (node) => ({ ...node, children: [...node.children] }),
  insertStaticContent: () => {
    const node = createHostNode('static')
    return [node, node]
  },
})

test('AipdForm registers during setup and unregisters with the child scope', async () => {
  const visible = ref(true)
  let controller

  const FormItem = defineComponent({
    name: 'RuntimeFormItem',
    setup() {
      useAipdFormItem({ getSubmitValue: () => ({ value: 1 }) })
      return () => h('field')
    },
  })
  const Root = defineComponent({
    setup() {
      controller = createAipdForm().pro_formController
      return () => h('root', visible.value ? [h(FormItem)] : [])
    },
  })

  const app = renderer.createApp(Root)
  app.mount(createHostNode('container'))
  assert.equal(controller.getItems().length, 1)

  visible.value = false
  await nextTick()
  assert.equal(controller.getItems().length, 0)
  app.unmount()
})

test('AipdSearch registers during setup and unregisters with the child scope', async () => {
  const visible = ref(true)
  let controller

  const Filter = defineComponent({
    name: 'RuntimeSearchFilter',
    setup() {
      useAipdSearchFilter({ getPostValue: () => ({ status: 'active' }) })
      return () => h('filter')
    },
  })
  const Root = defineComponent({
    setup() {
      controller = createAipdSearch().pro_searchController
      return () => h('root', visible.value ? [h(Filter)] : [])
    },
  })

  const app = renderer.createApp(Root)
  app.mount(createHostNode('container'))
  assert.deepEqual(await controller.getPostValues(), {
    RuntimeSearchFilter: { status: 'active' },
  })

  visible.value = false
  await nextTick()
  assert.equal(controller.getFilters().length, 0)
  app.unmount()
})
