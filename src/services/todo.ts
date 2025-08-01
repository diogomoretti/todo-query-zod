import axios from 'axios'
import { z } from 'zod'

const TodoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

type Todo = z.infer<typeof TodoSchema>

export default async function fetchTodos(): Promise<Todo[]> {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos',
  )
  return z.array(TodoSchema).parse(response.data)
}