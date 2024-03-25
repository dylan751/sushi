import { ReactNode } from 'react'
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** MUI Imports
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

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

const OrganizationPage = () => {
  // ** Hooks
  const session = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const loginToOrganization = async (organization: OrganizationProfileResponseDto) => {
    // Fetch user's permissions for that organization
    const response = await $api(session.data?.accessToken).internal.getOrganizationUsersPermissions(organization.id)
    const userPermissions: CaslPermission[] = response.data.permissions

    // Set organization and permissions data into AuthContext
    localStorage.setItem('organization', JSON.stringify(organization))
    localStorage.setItem('permissions', JSON.stringify(userPermissions))

    router.replace(getOrganizationDefaultHomeUrl(organization.uniqueName))
  }

  const navigateToCreateOrganizationPage = () => {
    router.replace(getCreateOrganizationUrl())
  }

  return (
    <Box className='content-center'>
      <Card sx={{ width: 1 / 2 }}>
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
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {session.data &&
          session.data.user &&
          session.data.user.organizations &&
          session.data.user.organizations.length > 0 ? (
            session.data.user.organizations.map((organization: OrganizationProfileResponseDto) => {
              return (
                <Box
                  key={organization.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Avatar src='...' alt={organization.name} sx={{ mr: 3, height: 38, width: 38 }} />
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                        {organization.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { mr: 1.5, color: 'text.secondary', verticalAlign: 'middle' }
                        }}
                      >
                        <Typography variant='caption'>{organization.uniqueName}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Button variant='contained' sx={{ width: 1 / 4 }} onClick={() => loginToOrganization(organization)}>
                    {t('home.open')}
                  </Button>
                </Box>
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
        </CardContent>
      </Card>
    </Box>
  )
}

OrganizationPage.getLayout = (page: ReactNode) => <UserBlankLayoutWithAppBar>{page}</UserBlankLayoutWithAppBar>

export default OrganizationPage
