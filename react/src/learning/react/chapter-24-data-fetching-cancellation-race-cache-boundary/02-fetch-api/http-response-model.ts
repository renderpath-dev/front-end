export type HeaderRecord = Record<string, string>

export type HttpResponseSuccess<TData> = {
  type: 'success'
  data: TData
  headers: HeaderRecord
  ok: true
  status: number
}

export type HttpResponseFailure = {
  type: 'http-error' | 'network-error' | 'parse-error'
  headers?: HeaderRecord
  message: string
  ok?: false
  status?: number
}

export type HttpResponseResult<TData> =
  | HttpResponseSuccess<TData>
  | HttpResponseFailure

type MinimalResponse = Pick<Response, 'headers' | 'ok' | 'status' | 'statusText'>

export function toHeaderRecord(headers: Headers): HeaderRecord {
  return Array.from(headers.entries()).reduce<HeaderRecord>((record, [key, value]) => {
    record[key] = value
    return record
  }, {})
}

export function classifyHttpResponseStatus<TData>(
  response: MinimalResponse,
  data: TData,
): HttpResponseResult<TData> {
  const headers = toHeaderRecord(response.headers)

  if (response.ok) {
    return {
      type: 'success',
      data,
      headers,
      ok: true,
      status: response.status,
    }
  }

  return {
    type: 'http-error',
    headers,
    message: response.statusText || `HTTP ${response.status}`,
    ok: false,
    status: response.status,
  }
}

export function createNetworkErrorResult(error: unknown): HttpResponseFailure {
  return {
    type: 'network-error',
    message: error instanceof Error ? error.message : 'Network request failed',
  }
}

export function createParseErrorResult(error: unknown): HttpResponseFailure {
  return {
    type: 'parse-error',
    message: error instanceof Error ? error.message : 'Response body could not be parsed',
  }
}
