// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components
import OrganizationInformationCard from 'src/views/pages/settings/organization/OrganizationInformationCard'
import DeleteOrganizationCard from 'src/views/pages/settings/organization/DeleteOrganizationCard'

const TabOrganization = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrganizationInformationCard />
      </Grid>
      <Grid item xs={12}>
        <DeleteOrganizationCard />
      </Grid>
    </Grid>
  )
}
export default TabOrganization
