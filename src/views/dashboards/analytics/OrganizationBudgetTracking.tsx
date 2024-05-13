// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// ** Types
import { OrganizationStatisticsResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import { ReactNode } from 'react'

// ** Utils Imports
import { calculateBudgetProcess, renderColorBudgetProcess } from 'src/utils/budget'
import { getProjectDefaultTab } from 'src/utils/router'

// ** Styled component for the link
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 600
}))

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ height: '310px', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
}

export interface OrganizationBudgetTrackingProps {
  data: OrganizationStatisticsResponseDto
}

const OrganizationBudgetTracking = ({ data }: OrganizationBudgetTrackingProps) => {
  return (
    <Card>
      <CardHeader
        title='Budget Tracking'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent>
        <ScrollWrapper>
          {data.projects &&
            data.projects.map((project, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ...(index !== data.projects?.length - 1 ? { mb: 6 } : {})
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem' }}>
                        <LinkStyled href={getProjectDefaultTab(project.id)}>{project.name}</LinkStyled>
                      </Typography>
                      <Typography variant='caption'>{project.description}</Typography>
                    </Box>
                    <Box sx={{ width: '40%' }}>
                      <Typography variant='body2'>
                        {calculateBudgetProcess(project.totalSpent, project.totalBudget)}%
                      </Typography>
                      <LinearProgress
                        variant='determinate'
                        value={
                          calculateBudgetProcess(project.totalSpent, project.totalBudget) <= 100
                            ? calculateBudgetProcess(project.totalSpent, project.totalBudget)
                            : 100
                        }
                        color={renderColorBudgetProcess(project.totalSpent, project.totalBudget) as any}
                        sx={{ height: 6, borderRadius: '5px' }}
                      />
                    </Box>
                  </Box>
                </Box>
              )
            })}
        </ScrollWrapper>
      </CardContent>
    </Card>
  )
}

export default OrganizationBudgetTracking
