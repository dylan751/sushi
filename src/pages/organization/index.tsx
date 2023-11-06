import { ReactNode } from 'react'
import UserBlankLayoutWithAppBar from 'src/layouts/UserBlankLayoutWithAppBar'

// ** MUI Imports
import { useAuth } from 'src/hooks/useAuth'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

// ** Types
import { CaslPermission, OrganizationProfileResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Hooks
import { useApi } from 'src/hooks/useApi'

const OrganizationPage = () => {
  const { user, setPermissions, setOrganization } = useAuth()
  const { $api } = useApi()
  const router = useRouter()

  const loginToOrganization = async (organization: OrganizationProfileResponseDto) => {
    // Fetch user's permissions for that organization
    const response = await $api.internal.getUserPermissions(organization.id)
    const userPermissions: CaslPermission[] = response.data.permissions

    // Set organization and permissions data into AuthContext
    window.localStorage.setItem('organization', JSON.stringify(organization))
    setOrganization(organization)

    window.localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
    setPermissions(userPermissions)

    router.replace(`/${organization.uniqueName}/home`)
  }

  const navigateToCreateOrganizationPage = () => {
    router.replace('/organization/new')
  }

  return (
    <Box className='content-center'>
      <Card sx={{ width: 1 / 2 }}>
        <CardHeader
          title={
            user && user.organizations && user.organizations.length > 0
              ? 'Choose an organization'
              : 'Create new organization 🚀'
          }
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {user && user.organizations && user.organizations.length > 0 ? (
            user.organizations.map((organization: OrganizationProfileResponseDto) => {
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
                  <Button variant='contained' onClick={() => loginToOrganization(organization)}>
                    Open
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
                    Kick start your project
                  </Typography>
                </Box>
              </Box>
              <Button variant='contained' onClick={navigateToCreateOrganizationPage}>
                Create
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
