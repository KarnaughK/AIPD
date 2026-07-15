import { AipdSearchFilter } from './AipdSearchFilter.js'
import { AipdSearchPagination } from './AipdSearchPagination.js'

function normalizeFilterName(key) {
  if (typeof key === 'string' && key) return key
  if (key && typeof key === 'object' && typeof key.name === 'string' && key.name) return key.name
  throw new TypeError('filter key must be a filter name or a named Vue component')
}

export class AipdSearchController {
  constructor() {
    this.filters = new Map()
    this.initializers = []
    this.beforeSearchCallbacks = []
    this.searchCallback = async () => undefined
    this.pagination = null
    this.initialized = false
    this.initializationPromise = null
  }

  bindInit(initializer) {
    if (!(initializer instanceof Promise) && typeof initializer !== 'function') {
      throw new TypeError('bindInit requires a function or Promise')
    }
    this.initializers.push(initializer)
    return this
  }

  onSearch(callback) {
    if (typeof callback !== 'function') throw new TypeError('onSearch requires a function')
    this.searchCallback = callback
    return this
  }

  beforeSearch(callback) {
    if (typeof callback !== 'function') throw new TypeError('beforeSearch requires a function')
    if (!this.beforeSearchCallbacks.includes(callback)) this.beforeSearchCallbacks.push(callback)
    return this
  }

  initialize({ triggerSearch = true } = {}) {
    if (this.initializationPromise) return this.initializationPromise

    const run = Promise.resolve().then(async () => {
      await Promise.all(this.initializers.map((initializer) => (
        initializer instanceof Promise ? initializer : initializer()
      )))
      this.initialized = true
      if (triggerSearch) return this.triggerSearch()
      return undefined
    })

    this.initializationPromise = run
    run.catch(() => {
      if (this.initializationPromise === run) this.initializationPromise = null
    })
    return run
  }

  async triggerSearch({ resetPageNo = true } = {}) {
    for (const callback of this.beforeSearchCallbacks) {
      if (await callback()) return { skipped: true }
    }

    if (resetPageNo) await this.pagination?.setPagination({ pageNo: 1 })
    return this.searchCallback({
      resetPageNo,
      filters: await this.getPostValues(),
      pagination: await this.pagination?.getPostValue(),
    })
  }

  registerFilter(filter) {
    if (!(filter instanceof AipdSearchFilter)) {
      throw new TypeError('registerFilter requires an AipdSearchFilter')
    }
    if (this.filters.has(filter.filterName) && this.filters.get(filter.filterName) !== filter) {
      throw new Error(`AipdSearchFilter already registered: ${filter.filterName}`)
    }
    this.filters.set(filter.filterName, filter)
    return this
  }

  unregisterFilter(filterOrKey) {
    const filterName = filterOrKey instanceof AipdSearchFilter
      ? filterOrKey.filterName
      : normalizeFilterName(filterOrKey)
    if (filterOrKey instanceof AipdSearchFilter && this.filters.get(filterName) !== filterOrKey) return this
    this.filters.delete(filterName)
    return this
  }

  getFilter(key) {
    const filterName = normalizeFilterName(key)
    const filter = this.filters.get(filterName)
    if (!filter) throw new Error(`AipdSearchFilter not found: ${filterName}`)
    return filter
  }

  getFilters(keys) {
    if (!keys) return [...this.filters.values()]
    return [keys].flat().map((key) => this.getFilter(key))
  }

  async getPostValue(key) {
    return this.getFilter(key).getPostValue()
  }

  async getPostValues(keys) {
    const values = {}
    for (const filter of this.getFilters(keys)) {
      values[filter.filterName] = await filter.getPostValue()
    }
    return values
  }

  async updateFilter(key, payload) {
    await this.getFilter(key).update(payload)
    return this
  }

  async clearFilters(keys) {
    for (const filter of this.getFilters(keys)) await filter.clear()
    return this
  }

  registerPagination(pagination) {
    if (!(pagination instanceof AipdSearchPagination)) {
      throw new TypeError('registerPagination requires an AipdSearchPagination')
    }
    pagination.bindController(this)
    this.pagination = pagination
    return this
  }
}
