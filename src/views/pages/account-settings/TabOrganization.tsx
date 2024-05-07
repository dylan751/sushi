// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components
import OrganizationInformationCard from 'src/views/pages/account-settings/organization/OrganizationInformationCard'

const TabOrganization = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrganizationInformationCard />
      </Grid>
    </Grid>
  )
}
export default TabOrganization
