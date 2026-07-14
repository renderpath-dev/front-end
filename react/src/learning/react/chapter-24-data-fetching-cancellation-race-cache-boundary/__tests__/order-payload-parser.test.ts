import { describe, expect, it } from 'vitest'
import { parseOrdersPayload } from '../03-response-parsing/order-payload-parser'

describe('parseOrdersPayload', () => {
  it('accepts a valid order payload', () => {
    const result = parseOrdersPayload({
      rows: [{ customer: 'Northwind Studio', id: 'order-501', status: 'paid', total: 248 }],
    })

    expect(result).toEqual({
      orders: [{ customer: 'Northwind Studio', id: 'order-501', status: 'paid', total: 248 }],
      type: 'valid',
    })
  })

  it('rejects malformed payloads', () => {
    expect(parseOrdersPayload({ rows: [{ id: 'order-501' }] })).toMatchObject({
      type: 'invalid',
    })
    expect(parseOrdersPayload({ rows: 'not-array' })).toMatchObject({
      type: 'invalid',
    })
  })
})
