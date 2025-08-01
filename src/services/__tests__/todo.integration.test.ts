import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import fetchTodos from '../todo'

const server = setupServer(
  http.get('https://jsonplaceholder.typicode.com/todos', () => {
    return HttpResponse.json([
      {
        id: 1,
        userId: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        id: 2,
        userId: 1,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      {
        id: 3,
        userId: 1,
        title: 'fugiat veniam minus',
        completed: false,
      },
    ])
  })
)

describe('fetchTodos Integration Tests', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('should fetch todos from the API successfully', async () => {
    const todos = await fetchTodos()

    expect(todos).toHaveLength(3)
    expect(todos[0]).toEqual({
      id: 1,
      userId: 1,
      title: 'delectus aut autem',
      completed: false,
    })
  })

  it('should handle server errors', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(fetchTodos()).rejects.toThrow()
  })

  it('should handle network errors', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return HttpResponse.error()
      })
    )

    await expect(fetchTodos()).rejects.toThrow()
  })

  it('should handle invalid JSON response', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse('invalid json', {
          headers: { 'Content-Type': 'application/json' },
        })
      })
    )

    await expect(fetchTodos()).rejects.toThrow()
  })

  it('should handle empty response', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return HttpResponse.json([])
      })
    )

    const todos = await fetchTodos()
    expect(todos).toEqual([])
  })

  it('should handle malformed todo data', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return HttpResponse.json([
          {
            id: 1,
            userId: 1,
            // Missing title
            completed: false,
          },
        ])
      })
    )

    await expect(fetchTodos()).rejects.toThrow()
  })
}) 