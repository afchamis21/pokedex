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
  flexWrap: 'wrap',
  gap: '3rem',
})

export const SocialSectionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,
  alignItems: 'center',
  maxWidth: '20rem',
  margin: '0 auto',
})
