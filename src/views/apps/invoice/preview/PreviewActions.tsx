// ** Next Import
import Link from 'next/link'

// ** React Import
import { useContext } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { getInvoiceEditUrl, getInvoicePrintUrl } from 'src/utils/router/invoice'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface Props {
  id: string | undefined
  toggleAddPaymentDrawer: () => void
  toggleSendInvoiceDrawer: () => void
}

const PreviewActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          variant='contained'
          onClick={toggleSendInvoiceDrawer}
          startIcon={<Icon icon='mdi:send-outline' />}
        >
          Send Invoice
        </Button>
        <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined'>
          Download
        </Button>
        <Button
          fullWidth
          target='_blank'
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href={getInvoicePrintUrl(id)}
        >
          Print
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href={getInvoiceEditUrl(id)}
          disabled={!ability?.can('update', 'invoice')}
        >
          Edit Invoice
        </Button>
        <Button
          fullWidth
          color='success'
          variant='contained'
          onClick={toggleAddPaymentDrawer}
          startIcon={<Icon icon='mdi:currency-usd' />}
        >
          Add Payment
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
