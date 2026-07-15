import assert from 'node:assert/strict'
import test from 'node:test'

import { AipdFormController } from '../src/aipd-form/AipdFormController.js'
import { AipdFormItem } from '../src/aipd-form/AipdFormItem.js'

function createItem(itemName, overrides = {}) {
  return new AipdFormItem({
    itemName,
    getValue: () => `${itemName}-value`,
    getSubmitValue: () => ({ [itemName]: `${itemName}-submit` }),
    ...overrides,
  })
}

test('registers, reads and unregisters autonomous items', async () => {
  const controller = new AipdFormController()
  const profile = createItem('ProfileSection')
  const price = createItem('PriceSection')

  controller.registerItem(profile).registerItem(price)

  assert.deepEqual(await controller.getValue(), {
    ProfileSection: 'ProfileSection-value',
    PriceSection: 'PriceSection-value',
  })
  assert.deepEqual(await controller.getSubmitValue('ProfileSection'), {
    ProfileSection: 'ProfileSection-submit',
  })
  await assert.rejects(() => controller.getSubmitValue(), /requires an item key/)

  controller.unregisterItem(profile)
  assert.throws(() => controller.getItem('ProfileSection'), /not found/)
})

test('normalizes validation failures without losing item ownership', async () => {
  const controller = new AipdFormController()
  controller
    .registerItem(createItem('ValidSection', { validate: () => true }))
    .registerItem(createItem('InvalidSection', {
      validate: () => ({ valid: false, fields: { amount: ['required'] } }),
    }))
    .registerItem(createItem('ImplicitInvalidSection', {
      validate: () => ({ fields: { date: ['invalid range'] } }),
    }))
    .registerItem(createItem('ThrownSection', {
      validate: () => { throw new Error('service unavailable') },
    }))

  const result = await controller.validate()

  assert.equal(result.valid, false)
  assert.deepEqual(result.errors, [
    { itemName: 'InvalidSection', field: 'amount', message: 'required' },
    { itemName: 'ImplicitInvalidSection', field: 'date', message: 'invalid range' },
    { itemName: 'ThrownSection', message: 'service unavailable' },
  ])
})

test('forwards facts to an item and awaits asynchronous initialization', async () => {
  const events = []
  const controller = new AipdFormController()
  controller.registerItem(createItem('Receiver', {
    update: async (payload) => events.push(payload),
  }))
  controller.bindInit(async () => events.push('initialized'))

  await controller.initialize()
  await controller.updateItem('Receiver', { departmentId: 7 })

  assert.deepEqual(events, ['initialized', { departmentId: 7 }])
})
