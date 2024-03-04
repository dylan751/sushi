// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components Imports
import AddCard from 'src/views/apps/invoice/add/AddCard'
import AddActions from 'src/views/apps/invoice/add/AddActions'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const InvoiceAdd = () => {
  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default InvoiceAdd
