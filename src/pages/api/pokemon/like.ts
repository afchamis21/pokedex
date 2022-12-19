import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function getUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const body = req.body.data
  const { userId, pokemonId } = body
  console.log(body)

  if (!userId) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  if (!pokemonId) {
    return res.status(400).json({ message: 'Invalid pokemonId' })
  }

  const response = await prisma.likedPokemon.create({
    data: {
      pokemonId,
      userId,
    },
  })

  return res.status(201).json({ response })
}
