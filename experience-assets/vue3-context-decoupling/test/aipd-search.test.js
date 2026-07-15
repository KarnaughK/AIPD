import assert from 'node:assert/strict'
import test from 'node:test'

import { AipdSearchController } from '../src/aipd-search/AipdSearchController.js'
import { AipdSearchFilter } from '../src/aipd-search/AipdSearchFilter.js'
import { AipdSearchPagination } from '../src/aipd-search/AipdSearchPagination.js'

test('collects filter values and applies reset/keep pagination semantics', async () => {
  let pageNo = 3
  const searches = []
  const controller = new AipdSearchController()
  const filter = new AipdSearchFilter({
    filterName: 'KeywordFilter',
    getPostValue: () => ({ keyword: 'aipd' }),
  })
  const pagination = new AipdSearchPagination({
    getPostValue: () => ({ pageNo, pageSize: 20 }),
    updatePagination: (patch) => { pageNo = patch.pageNo ?? pageNo },
  })

  controller
    .registerFilter(filter)
    .registerPagination(pagination)
    .onSearch((payload) => searches.push(payload))

  await controller.triggerSearch()
  pageNo = 4
  await pagination.triggerPageChange()

  assert.equal(searches[0].resetPageNo, true)
  assert.equal(searches[0].pagination.pageNo, 1)
  assert.equal(searches[1].resetPageNo, false)
  assert.equal(searches[1].pagination.pageNo, 4)
  assert.deepEqual(searches[0].filters, {
    KeywordFilter: { keyword: 'aipd' },
  })
})

test('waits for initialization and propagates an initialization failure', async () => {
  const events = []
  const controller = new AipdSearchController()
  controller
    .bindInit(async () => events.push('options-ready'))
    .onSearch(async () => events.push('search'))

  await controller.initialize()
  assert.deepEqual(events, ['options-ready', 'search'])

  const failed = new AipdSearchController()
  failed.bindInit(async () => { throw new Error('load failed') })
  await assert.rejects(() => failed.initialize(), /load failed/)
})

test('beforeSearch can stop a request and dynamic filters unregister cleanly', async () => {
  let searched = false
  const controller = new AipdSearchController()
  const filter = new AipdSearchFilter({ filterName: 'StatusFilter' })

  controller
    .registerFilter(filter)
    .beforeSearch(() => true)
    .onSearch(() => { searched = true })

  assert.deepEqual(await controller.triggerSearch(), { skipped: true })
  assert.equal(searched, false)

  controller.unregisterFilter(filter)
  assert.throws(() => controller.getFilter('StatusFilter'), /not found/)
})

test('awaits asynchronous pagination reset before reading request params', async () => {
  let pageNo = 8
  let requestPageNo
  const controller = new AipdSearchController()
  controller
    .registerPagination(new AipdSearchPagination({
      getPostValue: async () => ({ pageNo }),
      updatePagination: async ({ pageNo: nextPageNo }) => {
        await Promise.resolve()
        pageNo = nextPageNo
      },
    }))
    .onSearch(({ pagination }) => { requestPageNo = pagination.pageNo })

  await controller.triggerSearch()
  assert.equal(requestPageNo, 1)
})

test('coalesces concurrent initialization into one load and one first search', async () => {
  let initializeCount = 0
  let searchCount = 0
  const controller = new AipdSearchController()
  controller
    .bindInit(async () => {
      initializeCount += 1
      await Promise.resolve()
    })
    .onSearch(() => { searchCount += 1 })

  await Promise.all([controller.initialize(), controller.initialize()])
  assert.equal(initializeCount, 1)
  assert.equal(searchCount, 1)
})

test('allows retry after a synchronously throwing initializer', async () => {
  let attempts = 0
  const controller = new AipdSearchController()
  controller.bindInit(() => {
    attempts += 1
    if (attempts === 1) throw new Error('first load failed')
  })

  await assert.rejects(() => controller.initialize({ triggerSearch: false }), /first load failed/)
  await controller.initialize({ triggerSearch: false })
  assert.equal(attempts, 2)
  assert.equal(controller.initialized, true)
})

test('pagination reset awaits page update before running reset side effects', async () => {
  const events = []
  const pagination = new AipdSearchPagination({
    getPostValue: () => ({ pageNo: 3 }),
    updatePagination: async () => {
      await Promise.resolve()
      events.push('page-updated')
    },
    resetPagination: () => events.push('reset-side-effect'),
  })

  await pagination.reset()
  assert.deepEqual(events, ['page-updated', 'reset-side-effect'])
})
