import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

interface newFriendPostBody {
  userId: string
  newFriendId: string
}

interface deleteFriendPostBody {
  userId: string
  friendId: string
}

export default async function getUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const query = req.query
    const { targetPage, paginationSize, userId } = query as Partial<{
      [key: string]: string
    }>

    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' })
    }

    if (!targetPage) {
      return res.status(400).json({ message: 'Invalid targetPage' })
    }

    const targetPageNumber = parseInt(targetPage)

    if (!paginationSize) {
      return res.status(400).json({ message: 'Invalid paginationSize' })
    }

    const paginationSizeNumber = parseInt(paginationSize)

    const totalFriendsList = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        friends: true,
      },
    })

    const totalFriends = totalFriendsList?.friends.length

    const userAndFriends = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: {
          skip: paginationSizeNumber * (targetPageNumber - 1),
          take: paginationSizeNumber,
        },
      },
    })

    const friendsList = userAndFriends?.friends.map((friend) => {
      return { id: friend.id, name: friend.name, image: friend.image }
    })

    return res.status(200).json({
      friendsList,
      previousPage: targetPageNumber > 1 ? targetPageNumber - 1 : null,
      nextPage: totalFriends
        ? totalFriends >= (targetPageNumber + 1) * paginationSizeNumber
          ? targetPageNumber + 1
          : null
        : null,
    })
  }

  if (req.method === 'POST') {
    const body = req.body.data
    const { userId, newFriendId } = body as newFriendPostBody

    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' })
    }

    if (!newFriendId) {
      return res.status(400).json({ message: 'Invalid newFriendId' })
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: {
            id: newFriendId,
          },
        },
      },
      include: {
        friends: true,
      },
    })

    const friendList = user.friends

    return res.status(200).json({ friendList })
  }

  if (req.method === 'DELETE') {
    const body = req.body
    const { userId, friendId } = body as deleteFriendPostBody

    if (!userId) {
      return res.status(400).json({ message: 'Invalid userId' })
    }

    if (!friendId) {
      return res.status(400).json({ message: 'Invalid friendId' })
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
      },
      include: {
        friends: true,
      },
    })

    const friendsList = user.friends

    return res.status(200).json({ friendsList })
  }
}
