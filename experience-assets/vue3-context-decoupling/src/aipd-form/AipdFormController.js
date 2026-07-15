import { AipdFormItem } from './AipdFormItem.js'

function normalizeItemName(key) {
  if (typeof key === 'string' && key) return key
  if (key && typeof key === 'object' && typeof key.name === 'string' && key.name) return key.name
  throw new TypeError('AipdFormController key must be an item name or a named Vue component')
}

function normalizeErrors(errors) {
  if (!errors) return []
  if (Array.isArray(errors)) return errors.flatMap((error) => normalizeErrors(error))
  if (errors instanceof Error) return [{ message: errors.message }]
  if (typeof errors === 'string') return [{ message: errors }]

  if (typeof errors === 'object') {
    if (errors.message) return [errors]
    return Object.entries(errors).flatMap(([field, value]) => (
      normalizeErrors(value).map((error) => ({ field, ...error }))
    ))
  }

  return [{ message: String(errors) }]
}

function normalizeValidation(itemName, result) {
  if (typeof result === 'boolean') {
    return {
      itemName,
      valid: result,
      errors: result ? [] : [{ message: `${itemName} validate failed` }],
    }
  }

  if (Array.isArray(result)) {
    return { itemName, valid: result.length === 0, errors: normalizeErrors(result) }
  }

  if (!result || typeof result !== 'object') {
    return { itemName, valid: true, errors: [] }
  }

  const errors = normalizeErrors(result.errors || result.fields || result.error)
  return {
    itemName,
    valid: result.valid !== false && errors.length === 0,
    errors,
  }
}

export class AipdFormController {
  constructor() {
    this.items = new Map()
    this.initializers = []
  }

  bindInit(initializer) {
    if (!(initializer instanceof Promise) && typeof initializer !== 'function') {
      throw new TypeError('bindInit requires a function or Promise')
    }
    this.initializers.push(initializer)
    return this
  }

  async initialize() {
    await Promise.all(this.initializers.map((initializer) => (
      initializer instanceof Promise ? initializer : initializer()
    )))
    return this
  }

  registerItem(item) {
    if (!(item instanceof AipdFormItem)) {
      throw new TypeError('registerItem requires an AipdFormItem')
    }
    if (this.items.has(item.itemName) && this.items.get(item.itemName) !== item) {
      throw new Error(`AipdFormItem already registered: ${item.itemName}`)
    }
    this.items.set(item.itemName, item)
    return this
  }

  unregisterItem(itemOrKey) {
    const itemName = itemOrKey instanceof AipdFormItem
      ? itemOrKey.itemName
      : normalizeItemName(itemOrKey)
    if (itemOrKey instanceof AipdFormItem && this.items.get(itemName) !== itemOrKey) return this
    this.items.delete(itemName)
    return this
  }

  getItem(key) {
    const itemName = normalizeItemName(key)
    const item = this.items.get(itemName)
    if (!item) throw new Error(`AipdFormItem not found: ${itemName}`)
    return item
  }

  getItems(keys) {
    if (!keys) return [...this.items.values()]
    return [keys].flat().map((key) => this.getItem(key))
  }

  async validate(keys) {
    const results = []

    for (const item of this.getItems(keys)) {
      try {
        results.push(normalizeValidation(item.itemName, await item.validate()))
      } catch (error) {
        results.push({
          itemName: item.itemName,
          valid: false,
          errors: normalizeErrors(error?.fields || error),
        })
      }
    }

    return {
      valid: results.every((result) => result.valid),
      items: results,
      errors: results.flatMap((result) => (
        result.errors.map((error) => ({ itemName: result.itemName, ...error }))
      )),
    }
  }

  async getValue(key) {
    if (key) return this.getItem(key).getValue()
    const values = {}
    for (const item of this.getItems()) values[item.itemName] = await item.getValue()
    return values
  }

  async getSubmitValue(key) {
    if (!key) {
      throw new Error('AipdFormController.getSubmitValue requires an item key')
    }
    return this.getItem(key).getSubmitValue()
  }

  async updateItem(key, payload) {
    await this.getItem(key).update(payload)
    return this
  }

  async clear(keys) {
    for (const item of this.getItems(keys)) await item.clear()
    return this
  }

  async clearValidate(keys) {
    for (const item of this.getItems(keys)) await item.clearValidate()
    return this
  }
}
