import { describe, expect, it } from 'vitest'
import {
  classifyHttpResponseStatus,
  createNetworkErrorResult,
  createParseErrorResult,
} from '../02-fetch-api/http-response-model'

describe('http response model', () => {
  it('classifies successful responses', () => {
    const response = new Response(JSON.stringify({ rows: [] }), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    })

    const result = classifyHttpResponseStatus(response, { rows: [] })

    expect(result).toMatchObject({
      ok: true,
      status: 200,
      type: 'success',
    })
  })

  it('classifies HTTP errors without treating them as network failures', () => {
    const response = new Response('Missing', {
      headers: { 'content-type': 'text/plain' },
      status: 404,
      statusText: 'Not Found',
    })

    const result = classifyHttpResponseStatus(response, null)

    expect(result).toMatchObject({
      message: 'Not Found',
      ok: false,
      status: 404,
      type: 'http-error',
    })
  })

  it('classifies parse and network errors separately', () => {
    expect(createParseErrorResult(new Error('Bad JSON'))).toMatchObject({
      message: 'Bad JSON',
      type: 'parse-error',
    })
    expect(createNetworkErrorResult(new Error('Failed to fetch'))).toMatchObject({
      message: 'Failed to fetch',
      type: 'network-error',
    })
  })
})
