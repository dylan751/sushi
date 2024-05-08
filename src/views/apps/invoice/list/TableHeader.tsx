// ** Next Import
import Link from 'next/link'

// ** React Import
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { getOrgUniqueName } from 'src/utils/organization'
import { generateCsvFilename } from 'src/utils/csv'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'
import { CSVLink } from 'react-csv'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Hooks Imports
import { useTheme } from '@mui/material/styles'

// ** Types Imports
import { InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

interface TableHeaderProps {
  invoices: InvoiceResponseDto[]
}

const TableHeader = (props: TableHeaderProps) => {
  const { invoices } = props

  // ** Utils
  const uniqueName = getOrgUniqueName()

  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  const theme = useTheme()

  const exportData = invoices.map(invoice => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { category, creator, items, project, ...res } = invoice
    const data: any = res
    data.category = invoice.category.name
    data.creator = invoice.creator.name
    data.project = invoice.project.name

    return data
  })

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<Icon icon='mdi:export-variant' />}>
        <CSVLink
          data={exportData}
          filename={generateCsvFilename('invoices')}
          style={{ textDecoration: 'none', color: theme.palette.text.secondary }}
          target='_blank'
        >
          {t('role_page.user.export')}
        </CSVLink>
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          sx={{ mb: 2 }}
          component={Link}
          variant='contained'
          href={`/${uniqueName}/invoice/add`}
          disabled={!ability?.can('create', 'invoice')}
        >
          {t('invoice_page.list.create_invoice')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
