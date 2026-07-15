export class AipdSearchPagination {
  constructor({ getPostValue, updatePagination, resetPagination } = {}) {
    if (typeof getPostValue !== 'function') {
      throw new TypeError('AipdSearchPagination requires getPostValue')
    }
    if (updatePagination !== undefined && typeof updatePagination !== 'function') {
      throw new TypeError('updatePagination requires a function')
    }
    if (resetPagination !== undefined && typeof resetPagination !== 'function') {
      throw new TypeError('resetPagination requires a function')
    }

    this.getPostValueCallback = getPostValue
    this.updatePaginationCallback = updatePagination || (() => undefined)
    this.resetPaginationCallback = resetPagination || (() => undefined)
    this.controller = null
  }

  bindController(controller) {
    if (!controller || typeof controller.triggerSearch !== 'function') {
      throw new TypeError('bindController requires an AipdSearchController-compatible object')
    }
    this.controller = controller
    return this
  }

  async triggerPageChange() {
    if (!this.controller) throw new Error('AipdSearchPagination is not registered')
    return this.controller.triggerSearch({ resetPageNo: false })
  }

  setPagination(patch) {
    return this.updatePaginationCallback(patch)
  }

  async reset(shouldScrollToTop = true) {
    await this.setPagination({ pageNo: 1 })
    return this.resetPaginationCallback(shouldScrollToTop)
  }

  getPostValue() {
    return this.getPostValueCallback()
  }
}
