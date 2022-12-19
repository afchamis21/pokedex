import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function getUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const query = req.query
  const { userId } = query as Partial<{
    [key: string]: string
  }>

  if (!userId) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return res.status(201).json({ name: response?.name, image: response?.image })
}
