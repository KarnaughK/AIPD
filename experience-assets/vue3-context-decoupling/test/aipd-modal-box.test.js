import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createOverlaySession,
  parseShowOptions,
} from '../src/aipd-modal-box/session.js'
import {
  clearAipdModalBoxAppContext,
  requireAipdModalBoxAppContext,
  setAipdModalBoxAppContext,
} from '../src/aipd-modal-box/appContext.js'

test('promise mode settles once and preserves the first close payload', async () => {
  const invocation = parseShowOptions({ config: { width: '640px' } })
  const session = createOverlaySession(invocation.callbacks)

  assert.equal(invocation.mode, 'promise')
  assert.deepEqual(invocation.callConfig, { width: '640px' })
  assert.equal(session.close({ saved: true }), true)
  assert.equal(session.close({ saved: false }), false)
  assert.deepEqual(await session.promise, { saved: true })
})

test('callback mode forwards update and close without duplicate close', async () => {
  const events = []
  const callbacks = {
    update: (payload) => events.push(['update', payload]),
    close: (payload) => events.push(['close', payload]),
  }
  const invocation = parseShowOptions({ callbacks, config: { title: 'Edit' } })
  const session = createOverlaySession(invocation.callbacks)

  session.update({ dirty: true })
  session.close('saved')
  session.close('ignored')

  assert.equal(invocation.mode, 'callback')
  assert.deepEqual(invocation.callConfig, { title: 'Edit' })
  assert.deepEqual(events, [
    ['update', { dirty: true }],
    ['close', 'saved'],
  ])
  assert.equal(await session.promise, 'saved')
})

test('native close can settle a pending promise with undefined', async () => {
  const session = createOverlaySession()
  session.close(undefined)
  assert.equal(await session.promise, undefined)
})

test('a throwing close callback cannot roll back settlement', async () => {
  const session = createOverlaySession({
    close: () => { throw new Error('consumer callback failed') },
  })

  assert.throws(() => session.close('saved'), /consumer callback failed/)
  assert.equal(session.settled, true)
  assert.equal(await session.promise, 'saved')
  assert.equal(session.close('ignored'), false)
})

test('app context registration fails fast instead of silently losing plugins', () => {
  clearAipdModalBoxAppContext()
  assert.throws(() => requireAipdModalBoxAppContext(), /not registered/)

  const appContext = { provides: Object.create(null) }
  setAipdModalBoxAppContext(appContext)
  assert.equal(requireAipdModalBoxAppContext(), appContext)
  clearAipdModalBoxAppContext()
})

test('show options reject ambiguous callback and config shapes', () => {
  assert.throws(() => parseShowOptions({ callbacks: 'close' }), /callbacks must be an object/)
  assert.throws(() => parseShowOptions({ config: [] }), /config must be an object/)
})
