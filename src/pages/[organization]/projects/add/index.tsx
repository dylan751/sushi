// ** Next Imports
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

// ** Type Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CreateProjectRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Hook Imports
import { useCurrentOrganization } from 'src/hooks'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { addProject } from 'src/store/apps/organization/project'

// ** Util Imports
import { getProjectListUrl } from 'src/utils/router'
import { useTranslation } from 'react-i18next'
import { $api } from 'src/utils/api'

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

const initialFormData: CreateProjectRequestDto = {
  name: '',
  description: '',
  totalBudget: 0,
  startDate: '',
  endDate: ''
}

const ProjectAdd = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [formData, setFormData] = useState<CreateProjectRequestDto>(initialFormData)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { organization, organizationId } = useCurrentOrganization()
  const { t } = useTranslation()
  const session = useSession()

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

    if (formData.description.length > 2000) {
      toast.error('Project description must be less than 2000 characters!')

      return
    }

    const createProjectRequest: CreateProjectRequestDto = {
      ...formData,
      startDate: format(dates[0], 'yyyy-MM-dd'),
      endDate: format(dates[1], 'yyyy-MM-dd')
    }

    dispatch(addProject({ organizationId, ...createProjectRequest })).then(async () => {
      // Update current organization's session
      const response = await $api(session.data?.accessToken).internal.getUserProfile()
      session.update({ organizations: response.data.organizations })
    })
    router.replace(getProjectListUrl())
  }

  return (
    <DatePickerWrapper>
      <Card>
        <CardHeader title={t('project_page.add.create_project')} />
        <CardContent>
          <form onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('project_page.add.project_name')}
                  placeholder='HPTN083'
                  helperText='You can use letters, numbers & periods'
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
                  label={t('project_page.add.description')}
                  placeholder='Bio...'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
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
                  label={t('project_page.add.total_budget')}
                  placeholder='23000'
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
                      label={t('project_page.add.project_date')}
                      end={endDateRange as number | Date}
                      start={startDateRange as number | Date}
                      dateformat={organization.dateFormat}
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
}

ProjectAdd.acl = {
  action: 'create',
  subject: 'project'
}

export default ProjectAdd
