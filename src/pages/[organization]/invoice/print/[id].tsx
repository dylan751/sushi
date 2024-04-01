// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
import PrintPage from 'src/views/apps/invoice/print/PrintPage'

const InvoicePrint = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <PrintPage id={id} />
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

InvoicePrint.acl = {
  action: 'read',
  subject: 'invoice'
}

export default InvoicePrint
