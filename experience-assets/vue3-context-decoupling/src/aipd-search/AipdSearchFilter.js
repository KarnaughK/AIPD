function optionalFunction(value, label) {
  if (value !== undefined && typeof value !== 'function') {
    throw new TypeError(`${label} requires a function`)
  }
}

export class AipdSearchFilter {
  constructor({ filterName, getValue, getPostValue, update, clear } = {}) {
    if (!filterName || typeof filterName !== 'string') {
      throw new TypeError('AipdSearchFilter requires a stable filterName')
    }

    optionalFunction(getValue, 'getValue')
    optionalFunction(getPostValue, 'getPostValue')
    optionalFunction(update, 'update')
    optionalFunction(clear, 'clear')

    this.filterName = filterName
    this.getValueCallback = getValue || (() => undefined)
    this.getPostValueCallback = getPostValue || (() => this.getValue())
    this.updateCallback = update || (() => undefined)
    this.clearCallback = clear || (() => undefined)
  }

  getValue() {
    return this.getValueCallback()
  }

  getPostValue() {
    return this.getPostValueCallback()
  }

  update(payload) {
    return this.updateCallback(payload)
  }

  clear() {
    return this.clearCallback()
  }
}
