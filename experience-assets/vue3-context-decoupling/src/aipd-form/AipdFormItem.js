function ensureFunction(value, label) {
  if (value !== undefined && typeof value !== 'function') {
    throw new TypeError(`${label} requires a function`)
  }
}

export class AipdFormItem {
  constructor(options = {}) {
    const {
      itemName,
      getValue,
      getSubmitValue,
      validate,
      update,
      clear,
      clearValidate,
    } = options

    if (!itemName || typeof itemName !== 'string') {
      throw new TypeError('AipdFormItem requires a stable itemName')
    }

    ensureFunction(getValue, 'getValue')
    ensureFunction(getSubmitValue, 'getSubmitValue')
    ensureFunction(validate, 'validate')
    ensureFunction(update, 'update')
    ensureFunction(clear, 'clear')
    ensureFunction(clearValidate, 'clearValidate')

    this.itemName = itemName
    this.getValueCallback = getValue || (() => undefined)
    this.getSubmitValueCallback = getSubmitValue || (() => this.getValue())
    this.validateCallback = validate || (() => true)
    this.updateCallback = update || (() => undefined)
    this.clearCallback = clear || (() => undefined)
    this.clearValidateCallback = clearValidate || (() => undefined)
  }

  getValue() {
    return this.getValueCallback()
  }

  getSubmitValue() {
    return this.getSubmitValueCallback()
  }

  validate() {
    return this.validateCallback()
  }

  update(payload) {
    return this.updateCallback(payload)
  }

  clear() {
    return this.clearCallback()
  }

  clearValidate() {
    return this.clearValidateCallback()
  }
}
