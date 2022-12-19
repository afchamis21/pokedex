interface isLoggedInUserProps {
  sessionId?: string
  userId?: string | string[]
}

export function IsLoggedInUser({
  sessionId,
  userId,
}: isLoggedInUserProps): boolean {
  const isLoggedInUser =
    userId instanceof Array ? userId.at(0) === sessionId : userId === sessionId

  return isLoggedInUser
}
