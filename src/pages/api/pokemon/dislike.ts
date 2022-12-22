import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function dislikePokemon(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const body = req.body
  const { userId, pokemonId } = body

  console.log(body)

  if (!userId) {
    return res.status(400).json({ error: 'Invalid userId' })
  }

  if (!pokemonId) {
    return res.status(400).json({ error: 'Invalid pokemonId' })
  }

  const response = await prisma.likedPokemon.delete({
    where: {
      pokemonId_userId: {
        pokemonId,
        userId,
      },
    },
  })

  console.log(response)

  return res.status(200).json({ response })
}
