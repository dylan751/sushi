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

export const initialFormData = { name: '', note: '', type: InvoiceType.EXPENSE, amount: '' }

const InvoiceAdd = () => {
  // ** States
  const [date, setDate] = useState<DateType>(new Date())
  const [formData, setFormData] = useState<any[]>([initialFormData])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = () => {
    console.log('formData', formData)

    // if (!name || !type || !amount || !date) {
    //   toast.error('Please fill out all the fields')

    //   return
    // }

    // const createInvoiceRequest: CreateInvoiceRequestDto = {
    //   name,
    //   note,
    //   type,
    //   amount: parseInt(amount),
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
