// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'

// ** Types Imports
import { UserCardStatsHorizontalProps } from '../types'

// ** Hook Imports
import { useTranslation } from 'react-i18next'

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>(({ theme }) => ({
  width: 44,
  height: 44,
  boxShadow: theme.shadows[3],
  marginRight: theme.spacing(2.75),
  backgroundColor: theme.palette.background.paper,
  '& svg': {
    fontSize: '1.75rem'
  }
}))

const UserCardStatsHorizontal = (props: UserCardStatsHorizontalProps) => {
  // ** Props
  const { title, icon, stats, color = 'primary' } = props

  // ** Hooks
  const { t } = useTranslation()

  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: theme => `${theme.shadows[0]} !important`,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{t(title)}</Typography>
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 1, fontWeight: 600, lineHeight: 1.05 }}>
                {stats}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCardStatsHorizontal
