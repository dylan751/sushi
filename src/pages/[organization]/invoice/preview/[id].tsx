// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
// ** Components Imports
import Preview from 'src/views/apps/invoice/preview/Preview'

const InvoicePreview = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <Preview id={id} />
}

InvoicePreview.acl = {
  action: 'read',
  subject: 'invoice'
}

export default InvoicePreview
