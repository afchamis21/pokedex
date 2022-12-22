import { api } from '../lib/axios'

export async function getUserInformation(
  userId?: string | string[],
): Promise<{ name?: string; image?: string; id: string }> {
  const id = userId instanceof Array ? userId.at(0) : userId
  const response = await api.get('/api/user', {
    params: {
      userId: id,
    },
  })

  return { ...response.data, id }
}
