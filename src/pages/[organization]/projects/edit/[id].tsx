// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAProject, updateProject } from 'src/store/apps/project'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { ProjectResponseDto, UpdateProjectRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
import { getProjectListUrl } from 'src/utils/router'

// ** Third Party Imports
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'
import { useTranslation } from 'react-i18next'

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

  return (
    <TextField
      fullWidth
      inputRef={ref}
      {...updatedProps}
      label={props.label || ''}
      value={value}
      placeholder='02/03/2024 - 07/05/2024'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Icon icon='mdi:calendar-blank-outline' />
          </InputAdornment>
        )
      }}
    />
  )
})
/* eslint-enable */

const ProjectEdit = () => {
  const router = useRouter()
  const id = router.query.id as string

  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const projectStore = useSelector((state: RootState) => state.project)

  const { organizationId } = useCurrentOrganization()
  const { t } = useTranslation()

  // ** States
  const [dates, setDates] = useState<Date[]>([
    (projectStore.project as ProjectResponseDto).startDate
      ? new Date((projectStore.project as ProjectResponseDto).startDate)
      : new Date(),
    (projectStore.project as ProjectResponseDto).endDate
      ? new Date((projectStore.project as ProjectResponseDto).endDate)
      : new Date()
  ])
  const [endDateRange, setEndDateRange] = useState<DateType>(
    (projectStore.project as ProjectResponseDto).endDate
      ? new Date((projectStore.project as ProjectResponseDto).endDate)
      : new Date()
  )
  const [startDateRange, setStartDateRange] = useState<DateType>(
    (projectStore.project as ProjectResponseDto).startDate
      ? new Date((projectStore.project as ProjectResponseDto).startDate)
      : new Date()
  )
  const [formData, setFormData] = useState<UpdateProjectRequestDto>({
    name: (projectStore.project as ProjectResponseDto).name,
    description: (projectStore.project as ProjectResponseDto).description,
    totalBudget: (projectStore.project as ProjectResponseDto).totalBudget,
    startDate: format(dates[0] ? dates[0] : new Date(), 'yyyy-MM-dd'),
    endDate: format(dates[1] ? dates[1] : new Date(), 'yyyy-MM-dd')
  })

  useEffect(() => {
    if (projectStore.project) {
      setDates([
        (projectStore.project as ProjectResponseDto).startDate
          ? new Date((projectStore.project as ProjectResponseDto).startDate)
          : new Date(),
        (projectStore.project as ProjectResponseDto).endDate
          ? new Date((projectStore.project as ProjectResponseDto).endDate)
          : new Date()
      ])
      setEndDateRange(
        (projectStore.project as ProjectResponseDto).endDate
          ? new Date((projectStore.project as ProjectResponseDto).endDate)
          : new Date()
      )
      setStartDateRange(
        (projectStore.project as ProjectResponseDto).startDate
          ? new Date((projectStore.project as ProjectResponseDto).startDate)
          : new Date()
      )
      setFormData({
        name: (projectStore.project as ProjectResponseDto).name,
        description: (projectStore.project as ProjectResponseDto).description,
        totalBudget: (projectStore.project as ProjectResponseDto).totalBudget,
        startDate: format(dates[0] ? dates[0] : new Date(), 'yyyy-MM-dd'),
        endDate: format(dates[1] ? dates[1] : new Date(), 'yyyy-MM-dd')
      })
    }

    // Note: This useEffect only for re-render after the first time to wait for the data from BE
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectStore.project])

  useEffect(() => {
    dispatch(fetchAProject({ organizationId, id: parseInt(id!) }))
  }, [dispatch, id, organizationId])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const isSubmitDisabled = (): boolean => {
    return !formData.name || !formData.description || !formData.totalBudget || !startDateRange || !endDateRange
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Update project api call
    const updateProjectRequest: UpdateProjectRequestDto = {
      ...formData,
      startDate: format(dates[0], 'yyyy-MM-dd'),
      endDate: format(dates[1], 'yyyy-MM-dd')
    }

    // Call api
    dispatch(updateProject({ ...updateProjectRequest, projectId: parseInt(id!), organizationId }))
    router.replace(getProjectListUrl())
  }

  if (projectStore.project) {
    return (
      <DatePickerWrapper>
        <Card>
          <CardHeader title={t('project_page.edit.update_project')} />
          <CardContent>
            <form onSubmit={e => handleSubmit(e)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('project_page.edit.project_name')}
                    placeholder='HPTN083'
                    helperText='You can use letters, numbers & periods'
                    value={formData.name || ''}
                    onChange={e =>
                      setFormData(formData => {
                        return { ...formData, name: e.target.value }
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:cube-outline' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label={t('project_page.edit.description')}
                    placeholder='Bio...'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    value={formData.description || ''}
                    onChange={e =>
                      setFormData(formData => {
                        return { ...formData, description: e.target.value }
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:message-outline' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label={t('project_page.edit.total_budget')}
                    placeholder='23000'
                    value={formData.totalBudget || 0}
                    onChange={e =>
                      setFormData(formData => {
                        return { ...formData, totalBudget: parseInt(e.target.value) }
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:currency-usd' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                        label={t('project_page.edit.project_date')}
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large' disabled={isSubmitDisabled()}>
                    {t('button.submit')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </DatePickerWrapper>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Project with the id: {id} does not exist. Please check the list of projects:{' '}
            <Link href={getProjectListUrl()}>Project List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

ProjectEdit.acl = {
  action: 'update',
  subject: 'project'
}

export default ProjectEdit
