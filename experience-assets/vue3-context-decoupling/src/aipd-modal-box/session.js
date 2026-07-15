export function parseShowOptions(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('AipdModalBox show options must be an object')
  }

  const callbacks = options.callbacks || null
  const config = options.config || {}

  if (callbacks && typeof callbacks !== 'object') {
    throw new TypeError('AipdModalBox callbacks must be an object')
  }
  if (callbacks?.close !== undefined && typeof callbacks.close !== 'function') {
    throw new TypeError('AipdModalBox callbacks.close must be a function')
  }
  if (callbacks?.update !== undefined && typeof callbacks.update !== 'function') {
    throw new TypeError('AipdModalBox callbacks.update must be a function')
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    throw new TypeError('AipdModalBox config must be an object')
  }

  return {
    callbacks,
    callConfig: config,
    mode: callbacks ? 'callback' : 'promise',
  }
}

export function createOverlaySession(callbacks = null) {
  let settled = false
  let resolvePromise

  const promise = new Promise((resolve) => {
    resolvePromise = resolve
  })

  function close(payload) {
    if (settled) return false

    settled = true
    resolvePromise(payload)
    callbacks?.close?.(payload)
    return true
  }

  function update(payload) {
    callbacks?.update?.(payload)
  }

  return {
    close,
    update,
    promise,
    get settled() {
      return settled
    },
  }
}
