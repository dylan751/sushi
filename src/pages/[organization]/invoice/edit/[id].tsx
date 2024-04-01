// ** Next Imports
import { useRouter } from 'next/router'

// ** Demo Components Imports
import Edit from 'src/views/apps/invoice/edit/Edit'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const InvoiceEdit = () => {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Edit id={id} />
    </DatePickerWrapper>
  )
}

InvoiceEdit.acl = {
  action: 'update',
  subject: 'invoice'
}

export default InvoiceEdit
