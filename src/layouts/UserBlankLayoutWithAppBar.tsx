// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types

// ** AppBar Imports
import AppBar from './components/user-blank-layout-with-appBar'
import { BlankLayoutWithAppBarProps } from 'src/@core/layouts/types'

// Styled component for Blank Layout with AppBar component
const UserBlankLayoutWithAppBarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5),
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative',
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
  }
}))

const UserBlankLayoutWithAppBar = (props: BlankLayoutWithAppBarProps) => {
  // ** Props
  const { children } = props

  return (
    <UserBlankLayoutWithAppBarWrapper>
      <AppBar />
      <Box
        className='app-content'
        sx={{
          overflowX: 'hidden',
          position: 'relative',
          minHeight: theme => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`
        }}
      >
        {children}
      </Box>
    </UserBlankLayoutWithAppBarWrapper>
  )
}

export default UserBlankLayoutWithAppBar
