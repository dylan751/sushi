// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'

// ** Util Imports
import { getProjectAddUrl } from 'src/utils/router'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// ** Styled component for the link
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 600
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 13,
  bottom: 0,
  height: 185,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    height: 165,
    position: 'static'
  }
}))

const OrganizationCongratulations = () => {
  const { organization } = useCurrentOrganization()
  const { t } = useTranslation()

  return (
    <Card sx={{ position: 'relative', overflow: 'visible', mt: { xs: 0, sm: 7.5, md: 0 } }}>
      <CardContent sx={{ p: theme => `${theme.spacing(8.25, 7.5, 6.25, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 6.5 }}>
              {t('dashboard_page.welcome')}{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {organization.name}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='body2'>{t('dashboard_page.welcome_message')}</Typography>
            <Typography variant='body2'>
              {t('dashboard_page.start_with')}{' '}
              <LinkStyled href={getProjectAddUrl()}>{t('dashboard_page.create_project')}</LinkStyled>
            </Typography>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img
              alt={`${t('dashboard_page.welcome')} ${organization.name}`}
              src='/images/cards/illustration-john-2.png'
            />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrganizationCongratulations
