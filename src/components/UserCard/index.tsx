import Image from 'next/image'
import Link from 'next/link'
import { User, UserMinus, UserPlus } from 'phosphor-react'
import { UserInformationType } from '../../pages/profile/[id]'
import { Links, UserCardContainer, UserInfoContainer } from './styles'

interface UserCardProps {
  userInfo: UserInformationType
  isLoggedInUser: boolean
  isFriend?: boolean
  isUpdating: boolean
  handleAddFriend?: () => void
  handleRemoveFriend?: () => void
}

export function UserCard({
  userInfo,
  isLoggedInUser,
  isFriend,
  isUpdating,
  handleAddFriend,
  handleRemoveFriend,
}: UserCardProps) {
  return (
    <UserCardContainer>
      {userInfo?.image ? (
        <Image alt="" src={userInfo.image} width={80} height={80} />
      ) : (
        <User size={80} />
      )}
      <UserInfoContainer>
        <Links>
          {isLoggedInUser ? null : (
            <Link href={`/profile/${userInfo.id}`}>
              <User size={24} weight={'bold'} />
            </Link>
          )}
          {isLoggedInUser ? null : isFriend ? (
            <button
              onClick={handleRemoveFriend && handleRemoveFriend}
              disabled={isUpdating}
            >
              <UserMinus size={24} weight="bold" />
            </button>
          ) : (
            <button
              onClick={handleAddFriend && handleAddFriend}
              disabled={isUpdating}
            >
              <UserPlus size={24} weight="bold" />
            </button>
          )}
        </Links>
        <p>{userInfo?.name ?? 'User not found'}</p>
      </UserInfoContainer>
    </UserCardContainer>
  )
}
