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

// ** Hook Imports
import { useTranslation } from 'react-i18next'

const RolePage = () => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>{t('role_page.role.title')}</Typography>}
        subtitle={
          <>
            <Typography variant='body2'>{t('role_page.role.subtitle_1')}</Typography>
            <Typography variant='body2' color='info.main'>
              {t('role_page.role.subtitle_2', { MAX_ROLES_PER_ORGANIZATION })}
            </Typography>
          </>
        }
      />
      <Grid item xs={12} sx={{ mb: 4 }}>
        <RoleCards />
      </Grid>
      <PageHeader
        title={<Typography variant='h5'>{t('role_page.user.title')}</Typography>}
        subtitle={<Typography variant='body2'>{t('role_page.user.subtitle')}</Typography>}
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
