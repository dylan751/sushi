// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import RoleCards from 'src/views/apps/roles/RoleCards'

// ** Util Imports
import { MAX_ROLES_PER_ORGANIZATION } from 'src/utils/role'

const RolePage = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Roles List</Typography>}
        subtitle={
          <>
            <Typography variant='body2'>
              A role provided access to predefined menus and features so that depending on assigned role an
              administrator can have access to what he need
            </Typography>
            <Typography variant='body2' color='info.main'>
              An organization can have maximum of {MAX_ROLES_PER_ORGANIZATION} roles
            </Typography>
          </>
        }
      />
      <Grid item xs={12} sx={{ mb: 4 }}>
        <RoleCards />
      </Grid>
      <PageHeader
        title={<Typography variant='h5'>Total users with their roles</Typography>}
        subtitle={
          <Typography variant='body2'>
            Find all of your company’s administrator accounts and their associate roles.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

RolePage.acl = {
  action: 'read',
  subject: 'role'
}

export default RolePage
