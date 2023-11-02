// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useAuth } from 'src/hooks/useAuth'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { UserOrganizationType } from 'src/context/types'

const OrganizationPage = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const loginToOrganization = (organization: UserOrganizationType) => {
    // Took user's role & permissions for that organization
    window.localStorage.setItem('userData', JSON.stringify({ ...user, role: organization.roles[0].slug }))
    window.localStorage.setItem('organization', JSON.stringify(organization))

    if (user) {
      user.role = organization.roles[0].slug
      setUser(user)
    }
    router.replace(`/${organization.uniqueName}/home`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {user && user.organizations && user.organizations.length > 0 ? (
          user.organizations.map((organization: UserOrganizationType) => (
            <Card key={organization.id}>
              <CardHeader title={organization.name}></CardHeader>
              <CardActions className='card-action-dense'>
                <Button variant='text' onClick={() => loginToOrganization(organization)}>
                  Open
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader title='Create new organization 🚀'></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>Start with creating your organization.</Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

OrganizationPage.acl = {
  action: 'read',
  subject: 'organization-page'
}

export default OrganizationPage
