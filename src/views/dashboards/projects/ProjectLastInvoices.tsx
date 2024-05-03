// ** MUI Import
import { Card, CardContent, CardHeader, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Link from 'next/link'

// ** Types Imports
import {
  InvoiceResponseDto,
  InvoiceType,
  OrganizationUserResponseDto,
  ProjectStatisticsResponseDto
} from 'src/__generated__/AccountifyAPI'
import { ThemeColor } from 'src/@core/layouts/types'
import { Locale } from 'src/enum'

// ** Utils Imports
import { getInvoicePreviewUrl } from 'src/utils/router'
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'

// ** Third Party Imports
import { format } from 'date-fns'

interface CellType {
  row: InvoiceResponseDto
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** renders creator column
const renderCreator = (row: OrganizationUserResponseDto) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={'primary' as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

// ** renders client column
const renderClient = (row: string) => {
  return (
    <CustomAvatar
      skin='light'
      color={'primary' as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row || 'John Doe')}
    </CustomAvatar>
  )
}

export interface ProjectLastInvoicesProps {
  data: ProjectStatisticsResponseDto
}

const ProjectLastInvoices = ({ data }: ProjectLastInvoicesProps) => {
  const { t } = useTranslation()

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
      headerName: '#',
      renderCell: ({ row }: CellType) => <LinkStyled href={getInvoicePreviewUrl(row.id)}>{`#${row.id}`}</LinkStyled>
    },
    {
      flex: 0.2,
      field: 'creator',
      minWidth: 150,
      headerName: t('invoice_page.list.creator') as string,
      renderCell: ({ row }: CellType) => {
        const { creator } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderCreator(creator)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {creator.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'clientName',
      minWidth: 150,
      headerName: t('invoice_page.list.client') as string,
      renderCell: ({ row }: CellType) => {
        const { clientName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(clientName)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {clientName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'total',
      headerName: t('invoice_page.list.total') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2' sx={{ color: row.type === InvoiceType.EXPENSE ? 'error.main' : 'success.main' }}>
          {row.type === InvoiceType.EXPENSE ? '-' : '+'}
          {formatCurrencyAsStandard(row.total, Locale.EN, row.currency)}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'date',
      headerName: t('invoice_page.list.date') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'category',
      headerName: t('invoice_page.list.category') as string,
      renderCell: ({ row }: CellType) => (
        <CustomChip label={row.category.name} skin='light' color={row.category.color as any} />
      )
    }
  ]

  return (
    <Card>
      <CardHeader title='Last 5 Invoices' />
      <CardContent>
        <DataGrid
          autoHeight
          hideFooter
          rows={data.lastInvoices ?? []}
          columns={columns}
          disableRowSelectionOnClick
          pagination={undefined}
        />
      </CardContent>
    </Card>
  )
}

export default ProjectLastInvoices
