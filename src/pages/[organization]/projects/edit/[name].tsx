// ** React Imports
import { useState, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

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
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateProject } from 'src/store/apps/organization/project'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { UpdateProjectRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
import { getProjectListUrl } from 'src/utils/router'
import { $api } from 'src/utils/api'

// ** Third Party Imports
import { format } from 'date-fns'
import toast from 'react-hot-toast'
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
  dateformat: string
}

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, props.dateformat) : ''
  const endDate = props.end !== null ? ` - ${format(props.end, props.dateformat)}` : null

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
  const name = router.query.name as string
  const session = useSession()

  // ** Store
  const dispatch = useDispatch<AppDispatch>()

  const { organization, organizationId, project, projectId } = useCurrentOrganization(name)
  const { t } = useTranslation()

  // ** States
  const [dates, setDates] = useState<Date[]>([new Date(project!.startDate), new Date(project!.endDate)])
  const [endDateRange, setEndDateRange] = useState<DateType>(new Date(project!.endDate))
  const [startDateRange, setStartDateRange] = useState<DateType>(new Date(project!.startDate))
  const [formData, setFormData] = useState<UpdateProjectRequestDto>({
    name: project!.name,
    description: project!.description,
    totalBudget: project!.totalBudget,
    startDate: format(dates[0] ? dates[0] : new Date(), 'yyyy-MM-dd'),
    endDate: format(dates[1] ? dates[1] : new Date(), 'yyyy-MM-dd')
  })

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

    if (formData.description && formData.description.length > 2000) {
      toast.error('Project description must be less than 2000 characters!')

      return
    }

    // Update project api call
    const updateProjectRequest: UpdateProjectRequestDto = {
      ...formData,
      startDate: format(dates[0], 'yyyy-MM-dd'),
      endDate: format(dates[1], 'yyyy-MM-dd')
    }

    // Call api
    dispatch(updateProject({ ...updateProjectRequest, projectId: projectId!, organizationId })).then(async () => {
      // Update current organization's session
      const response = await $api(session.data?.accessToken).internal.getUserProfile()
      session.update({ organizations: response.data.organizations })
    })
    router.replace(getProjectListUrl())
  }

  if (project) {
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
                    showYearDropdown
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
                        dateformat={organization?.dateFormat}
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
            Project with the id: {projectId} does not exist. Please check the list of projects:{' '}
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
