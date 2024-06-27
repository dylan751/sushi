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

// ** Hooks Imports
import { useTranslation } from 'react-i18next'

interface Props {
  id: string | undefined
  toggleSendInvoiceDrawer: () => void
}

const PreviewActions = ({ id, toggleSendInvoiceDrawer }: Props) => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

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
          {t('invoice_page.preview.send_invoice')}
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
          {t('invoice_page.preview.print')}
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='success'
          variant='contained'
          href={getInvoiceEditUrl(id)}
          startIcon={<Icon icon='mdi:pencil-outline' />}
          disabled={!ability?.can('update', 'invoice')}
        >
          {t('invoice_page.preview.update_invoice')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
