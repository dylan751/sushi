// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components
import ChangePasswordCard from 'src/views/pages/settings/security/ChangePasswordCard'
import TwoFactorAuthentication from 'src/views/pages/settings/security/TwoFactorAuthentication'

const TabSecurity = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid>
    </Grid>
  )
}
export default TabSecurity
