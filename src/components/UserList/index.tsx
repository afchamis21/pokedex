import { CaretLeft, CaretRight } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { UserInformationType } from '../../pages/profile/[id]'
import { Spinner } from '../Spinner'
import { UserCard } from '../UserCard'
import {
  PaginationButton,
  PaginationButtonsContainer,
  SpinnerContainer,
  UserListContainer,
  UserListTitle,
} from './styles'

interface UserListProps {
  userId: string
  isUpdating: boolean
  userList: UserInformationType[]
  handleSetUserList: (newUserList: any) => void

  handleAddFriend: (props: {
    userId: string
    newFriendId: string
  }) => Promise<void>
}

export function UserList({
  userId,
  userList,
  isUpdating,
  handleSetUserList,
  handleAddFriend,
}: UserListProps) {
  const [navPagesLink, setNavPagesLink] = useState({
    previousPage: 0,
    nextPage: 0,
  })
  const [isUserListLoading, setIsUserListLoading] = useState(false)
  const paginationSize = 4

  const fetchUserList = useCallback(
    async (targetPage: number) => {
      setIsUserListLoading(true)
      const response = await api.get('/api/user/all', {
        params: { targetPage, paginationSize, userId },
      })

      handleSetUserList(response.data.userList)
      setNavPagesLink({
        previousPage: response.data.previousPage,
        nextPage: response.data.nextPage,
      })
      setIsUserListLoading(false)
    },
    [handleSetUserList, userId],
  )

  useEffect(() => {
    fetchUserList(1)
  }, [fetchUserList])

  function handleFetchNextPage() {
    fetchUserList(navPagesLink.nextPage)
  }

  function handleFetchPreviousPage() {
    fetchUserList(navPagesLink.previousPage)
  }

  if (isUserListLoading) {
    return (
      <>
        <UserListTitle>Discover other users:</UserListTitle>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </>
    )
  }

  return (
    <UserListContainer>
      <UserListTitle>Discover other users:</UserListTitle>

      {userList?.length === 0 ? (
        <p>You&apos;ve met all users!</p>
      ) : (
        <>
          <ul>
            {userList?.map((user) => (
              <li key={user.id}>
                <UserCard
                  userInfo={user}
                  isLoggedInUser={false}
                  showActionButtons={true}
                  isFriend={false}
                  isUpdating={isUpdating}
                  handleAddFriend={() => {
                    handleAddFriend({ userId, newFriendId: user.id })
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
    </UserListContainer>
  )
}
