// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// ** Types
import { CurrencyType, InvoiceResponseDto, InvoiceType } from 'src/__generated__/AccountifyAPI'
import { Locale } from 'src/enum'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Utils Imports
import { formatCurrencyAsStandard } from 'src/utils/currency'
import { getInvoiceEditUrl } from 'src/utils/router'
import format from 'date-fns/format'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ height: '220px', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
}

export interface OrganizationTotalCardProps {
  title: string
  type: InvoiceType
  invoices: InvoiceResponseDto[]
  total: number
}

const OrganizationTotalCard = ({ title, type, invoices, total }: OrganizationTotalCardProps) => {
  const data = invoices.filter(invoice => invoice.type === type)

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 10, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            {formatCurrencyAsStandard(total, Locale.EN, CurrencyType.USD)}
          </Typography>
        </Box>

        <ScrollWrapper>
          {data.map((item, index: number) => {
            return (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ...(index !== data.length - 1 ? { mb: 8.5 } : {})
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      <LinkStyled href={getInvoiceEditUrl(item.id)}>{`#${item.uid}`}</LinkStyled>
                    </Typography>
                    <Typography variant='caption'> {format(new Date(item.date), 'dd/MM/yyyy')}</Typography>
                  </Box>

                  <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                      {formatCurrencyAsStandard(item.total, Locale.EN, item.currency)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </ScrollWrapper>
      </CardContent>
    </Card>
  )
}

export default OrganizationTotalCard
