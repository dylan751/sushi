// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components Imports
import AddCard from 'src/views/apps/invoice/add/AddCard'
import AddActions from 'src/views/apps/invoice/add/AddActions'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { addInvoice } from 'src/store/apps/invoice'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { CreateInvoiceRequestDto, InvoiceType } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export const initialFormData = { index: 0, name: '', note: '', type: InvoiceType.EXPENSE, amount: '' }

const InvoiceAdd = () => {
  // ** States
  const [date, setDate] = useState<DateType>(new Date())
  const [formData, setFormData] = useState<any[]>([initialFormData])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = () => {
    // Validation
    formData.forEach(data => {
      if (!data.name || !data.type || !data.amount) {
        toast.error('Please fill out all the fields of all items')

        return
      }
    })

    // Create invoice api call
    const createInvoiceRequest = {
      items: formData.map(data => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { index, amount, ...resData } = data

        return { amount: parseInt(amount), ...resData }
      }),
      date: format(date as Date, 'yyyy-MM-dd')
    }
    console.log('createInvoiceRequest', createInvoiceRequest)

    // const createInvoiceRequest: CreateInvoiceRequestDto = {
    //   items: formData.map(data => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const { index, amount, ...resData } = data

    //     return { amount: parseInt(amount), ...resData }
    //   }),
    //   date: format(date, 'yyyy-MM-dd')
    // }

    // // Call api
    // dispatch(addInvoice(createInvoiceRequest))
  }

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard formData={formData} setFormData={setFormData} date={date} setDate={setDate} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

InvoiceAdd.acl = {
  action: 'create',
  subject: 'invoice'
}

export default InvoiceAdd
