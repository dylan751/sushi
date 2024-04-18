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
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField sx={{ width: '50%' }} inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const DashboardTab = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

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
          isClearable
          selectsRange
          monthsShown={2}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          customInput={
            <CustomInput
              dates={dates}
              setDates={setDates}
              label='Filter by Date'
              end={endDateRange as number | Date}
              start={startDateRange as number | Date}
            />
          }
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
