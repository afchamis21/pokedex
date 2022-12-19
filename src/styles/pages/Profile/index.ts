import { styled } from '../..'

export const ProfileContainer = styled('div', {
  flex: 1,
  maxWidth: '$maxW',
  width: '100%',
  margin: '0 auto',
  padding: '1.5rem 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '1.5rem',
})

export const UserInfoContainer = styled('header', {
  background: '$gray800',
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
})
