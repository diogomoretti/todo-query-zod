import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import './App.css'
import fetchTodos from './services/todo'

const NUM_OF_DAYS_TO_STALE: number = 1
const NUM_OF_TODOS_TO_SHOW: number = 10

function Loading() {
  return <div>Loading...</div>
}

function TodoList() {
  const { data: todos } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: NUM_OF_DAYS_TO_STALE * 24 * 60 * 60 * 1000,
  })

  return (
    <ul>
      {todos?.slice(0, NUM_OF_TODOS_TO_SHOW).map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <>
      <h1>Todos</h1>
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    </>
  )
}

export default App
