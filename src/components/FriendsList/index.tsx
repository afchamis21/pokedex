import { CaretLeft, CaretRight } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { UserInformationType } from '../../pages/profile/[id]'
import { Spinner } from '../Spinner'
import { UserCard } from '../UserCard'
import {
  FriendListTitle,
  FriendListContainer,
  PaginationButtonsContainer,
  PaginationButton,
  SpinnerContainer,
} from './styles'

interface FriendsListProps {
  userInfo: UserInformationType
  isLoggedInUser: boolean
  friendsList: UserInformationType[]
  isUpdating: boolean
  handleSetFriendsList: (newFriendsList: any) => void
  handleRemoveFriend: (props: {
    userId: string
    friendId: string
  }) => Promise<void>
}

export function FriendsList({
  userInfo,
  friendsList,
  isUpdating,
  isLoggedInUser,
  handleSetFriendsList,
  handleRemoveFriend,
}: FriendsListProps) {
  const [isFriendsListLoading, setIsFriendsListLoading] = useState(false)
  const [navPagesLink, setNavPagesLink] = useState({
    previousPage: 0,
    nextPage: 0,
  })
  const paginationSize = 5

  const fetchFriendsList = useCallback(
    async (targetPage: number) => {
      setIsFriendsListLoading(true)
      const response = await api.get('/api/user/friends', {
        params: { targetPage, paginationSize, userId: userInfo.id },
      })

      handleSetFriendsList(response.data.friendsList)
      setNavPagesLink({
        previousPage: response.data.previousPage,
        nextPage: response.data.nextPage,
      })
      setIsFriendsListLoading(false)
    },
    [handleSetFriendsList, userInfo.id],
  )

  useEffect(() => {
    fetchFriendsList(1)
  }, [fetchFriendsList])

  function handleFetchNextPage() {
    fetchFriendsList(navPagesLink.nextPage)
  }

  function handleFetchPreviousPage() {
    fetchFriendsList(navPagesLink.previousPage)
  }

  if (isFriendsListLoading) {
    return (
      <SpinnerContainer>
        <FriendListTitle>{userInfo.name} is following:</FriendListTitle>
        <Spinner />
      </SpinnerContainer>
    )
  }

  return (
    <FriendListContainer>
      <FriendListTitle>{userInfo.name} is following:</FriendListTitle>
      {friendsList?.length === 0 ? (
        <p>Users you follow will appear here</p>
      ) : (
        <>
          <ul>
            {friendsList?.map((friend) => (
              <li key={friend.id}>
                <UserCard
                  isUpdating={isUpdating}
                  userInfo={friend}
                  isLoggedInUser={false}
                  showActionButtons={isLoggedInUser}
                  isFriend={true}
                  handleRemoveFriend={() => {
                    handleRemoveFriend({
                      userId: userInfo.id,
                      friendId: friend.id,
                    })
                  }}
                />
              </li>
            ))}
          </ul>
          <PaginationButtonsContainer>
            <PaginationButton
              disabled={!navPagesLink.previousPage}
              onClick={handleFetchPreviousPage}
            >
              <CaretLeft size={16} weight="bold" />
            </PaginationButton>
            <PaginationButton
              disabled={!navPagesLink.nextPage}
              onClick={handleFetchNextPage}
            >
              <CaretRight size={16} weight="bold" />
            </PaginationButton>
          </PaginationButtonsContainer>
        </>
      )}
    </FriendListContainer>
  )
}
