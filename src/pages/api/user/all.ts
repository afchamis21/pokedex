import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function getAllUsers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const query = req.query
  const { targetPage, paginationSize, userId } = query as Partial<{
    [key: string]: string
  }>

  if (!userId) {
    return res.status(400).json({ message: 'Invalid userId' })
  }

  if (!targetPage) {
    return res.status(400).json({ message: 'Invalid currentPage' })
  }

  const targetPageNumber = parseInt(targetPage)

  if (!paginationSize) {
    return res.status(400).json({ message: 'Invalid paginationSize' })
  }

  const paginationSizeNumber = parseInt(paginationSize)

  const userListRaw = await prisma.user.findMany({
    skip: (targetPageNumber - 1) * paginationSizeNumber,
    take: paginationSizeNumber,
    where: {
      NOT: {
        friendsRelation: {
          some: {
            id: userId,
          },
        },
      },
      AND: {
        NOT: {
          id: userId,
        },
      },
    },
  })

  const totalUsers = await prisma.user.count({
    where: {
      NOT: {
        friendsRelation: {
          some: {
            id: userId,
          },
        },
      },
      AND: {
        NOT: {
          id: userId,
        },
      },
    },
  })

  const userList = userListRaw.map((user) => {
    return { id: user.id, name: user.name, image: user.image }
  })

  return res.status(200).json({
    userList,
    previousPage: targetPageNumber > 1 ? targetPageNumber - 1 : null,
    nextPage: totalUsers
      ? totalUsers >= (targetPageNumber + 1) * paginationSizeNumber
        ? targetPageNumber + 1
        : null
      : null,
  })
}
