// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// ** Type Import
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import ProjectTransactions from 'src/views/dashboards/projects/ProjectTransactions'
import ProjectActivityTimeline from 'src/views/dashboards/projects/ProjectActivityTimeline'
import ProjectApexLineChart from 'src/views/dashboards/projects/ProjectApexLineChart'
import ProjectApexDonutChart from 'src/views/dashboards/projects/ProjectApexDonutChart'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

interface CustomInputProps {
  label?: string
  readOnly?: boolean
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField inputRef={ref} {...props} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />
  )
})

const DashboardTab = () => {
  // ** State
  const [year, setYear] = useState<DateType>(new Date())

  const data: CardStatsCharacterProps[] = [
    {
      stats: '13.7k',
      title: 'Income',
      trendNumber: '+38%',
      chipColor: 'primary',
      chipText: 'Year of 2024',
      src: '/images/cards/pose_f9.png'
    },
    {
      stats: '24.5k',
      trend: 'negative',
      title: 'Expense',
      trendNumber: '-22%',
      chipText: 'Last Week',
      chipColor: 'secondary',
      src: '/images/cards/pose_m18.png'
    }
  ]

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <DatePicker
          showYearPicker
          selected={year}
          id='year-picker'
          dateFormat='yyyy'
          onChange={(date: Date) => setYear(date)}
          customInput={<CustomInput label='Year Picker' />}
        />
        <Grid container spacing={6} sx={{ paddingTop: '30px' }}>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
            <CardStatisticsCharacter data={data[1]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectTransactions />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProjectApexLineChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectApexDonutChart />
          </Grid>
          {/* TODO: Change this ProjectActivityTimeline to `Invoice list for this project` */}
          <Grid item xs={12} md={6}>
            <ProjectActivityTimeline />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default DashboardTab
