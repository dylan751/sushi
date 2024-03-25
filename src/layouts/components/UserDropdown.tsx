// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Auth Imports
import { useSession, signOut } from 'next-auth/react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Util Imports
import { getOrganization } from 'src/utils/localStorage'
import { getAccountSettingsAccountUrl } from 'src/utils/router/account-settings'
import { getSelectOrganizationUrl } from 'src/utils/router/organization'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const { t } = useTranslation()
  const router = useRouter()
  const session = useSession()

  // ** Utils
  const organization = getOrganization()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleAccountSettings = () => {
    router.replace(getAccountSettingsAccountUrl())
    handleDropdownClose()
  }

  const handleOrganization = () => {
    router.replace(getSelectOrganizationUrl())
    handleDropdownClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('organization')
    localStorage.removeItem('permissions')
    signOut({ callbackUrl: '/', redirect: false }).then(() => {
      router.asPath = '/'
    })
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={session.data?.user.name || ''}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={session.data?.user.avatar || '/images/avatars/1.png'}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={session.data?.user.name || ''}
                src={session.data?.user.avatar || '/images/avatars/1.png'}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{session.data?.user?.name || ''}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {organization && organization.roles.length > 1
                  ? `${organization?.roles[0].name} ...`
                  : organization?.roles[0].name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleAccountSettings()}>
          <Box sx={styles}>
            <Icon icon='mdi:account-cog-outline' />
            {t('user_dropdown.account_settings')}
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleOrganization()}>
          <Box sx={styles}>
            <Icon icon='mdi:office-building-outline' />
            {t('user_dropdown.organization')}
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:currency-usd' />
            {t('user_dropdown.pricing')}
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:help-circle-outline' />
            {t('user_dropdown.faq')}
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          {t('user_dropdown.logout')}
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
