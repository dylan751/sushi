import { ReactNode } from 'react'
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** MUI Imports
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
  Typography,
  styled
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { CaslPermission, OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Util Imports
import { getCreateOrganizationUrl, getOrganizationDefaultHomeUrl } from 'src/utils/router/organization'

// ** Next Auth Imports
import { useSession } from 'next-auth/react'

// ** Axios Imports
import { $api } from 'src/utils/api'

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const OrganizationPage = () => {
  // ** Hooks
  const session = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const loginToOrganization = async (organization: OrganizationProfileResponseDto) => {
    // Fetch user's permissions for that organization
    const response = await $api(session.data?.accessToken).internal.getOrganizationUsersPermissions(organization.id)
    const userPermissions: CaslPermission[] = response.data.permissions

    // Set permissions data into AuthContext
    localStorage.setItem('permissions', JSON.stringify(userPermissions))

    router.replace(getOrganizationDefaultHomeUrl(organization.uniqueName))
  }

  const navigateToCreateOrganizationPage = () => {
    router.replace(getCreateOrganizationUrl())
  }

  return (
    <Box className='content-center'>
      <Card sx={{ width: { lg: '40%', md: '50%', sm: '70%', xs: '100%' } }}>
        <CardHeader
          title={
            session.data &&
            session.data.user &&
            session.data.user.organizations &&
            session.data.user.organizations.length > 0
              ? t('home.choose_an_organization')
              : t('home.create_organization_header')
          }
        />
        <CardContent>
          <StyledList disablePadding>
            {session.data &&
            session.data.user &&
            session.data.user.organizations &&
            session.data.user.organizations.length > 0 ? (
              session.data.user.organizations.map((organization: OrganizationProfileResponseDto) => {
                return (
                  <ListItem key={organization.id}>
                    <ListItemAvatar>
                      <Avatar src='...' alt={organization.name} />
                    </ListItemAvatar>
                    <div>
                      <ListItemText primary={organization.name} />
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Box
                          sx={{
                            mr: 3,
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { mr: 1, color: 'success.main' }
                          }}
                        >
                          <Icon icon='mdi:circle' fontSize='0.625rem' />
                          <Typography variant='caption'>{t('home.active')}</Typography>
                        </Box>
                      </Box>
                    </div>
                    <ListItemSecondaryAction>
                      <Button variant='contained' size='small' onClick={() => loginToOrganization(organization)}>
                        {t('home.open')}
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '100%'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                    <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      {t('home.create_organization_description')}
                    </Typography>
                  </Box>
                </Box>
                <Button variant='contained' sx={{ width: 1 / 5 }} onClick={() => navigateToCreateOrganizationPage()}>
                  {t('home.create')}
                </Button>
              </Box>
            )}
          </StyledList>
        </CardContent>
      </Card>
    </Box>
  )
}

OrganizationPage.getLayout = (page: ReactNode) => <UserBlankLayoutWithAppBar>{page}</UserBlankLayoutWithAppBar>

export default OrganizationPage
