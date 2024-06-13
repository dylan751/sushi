// ** React Imports
import { useEffect, useState } from 'react'

import axios from 'axios'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials'
import { formatCurrencyAsStandard } from 'src/utils/currency'

// ** Enum Imports
import { Locale } from 'src/enum'

// ** Type Imports
import { CurrencyType } from 'src/__generated__/AccountifyAPI'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { GridColDef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface ExchangeRateType {
  nameVI: string
  image: string
  muaTm: string
  muaCk: string
  currency: string
  nameEN: string
  ban: string
}

export interface BIDVResponseType {
  hour: string
  data: ExchangeRateType[]
}

interface CellType {
  row: ExchangeRateType
}

const renderCurrencyImage = (row: ExchangeRateType) => {
  if (row.image) {
    return <CustomAvatar src={`https://bidv.com.vn/${row.image}`} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.currency ? row.currency : 'USD')}
      </CustomAvatar>
    )
  }
}

export interface BIDVExchangeRatesProps {
  customColumns?: GridColDef[]
}

const BIDVExchangeRates = (props: BIDVExchangeRatesProps) => {
  // ** States
  const [exchangeRates, setExchangeRates] = useState<BIDVResponseType>()

  // ** Hooks
  const { t } = useTranslation()

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const response = await axios.get('https://bidv.com.vn/ServicesBIDV/ExchangeDetailServlet')
        setExchangeRates(response.data)
      } catch (error) {
        toast.error('Error while fetching exchange rates!')
      }
    }

    getExchangeRates()
  }, [])

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 280,
      field: 'currency',
      headerName: t('exchange_rates.currency') as string,
      renderCell: ({ row }: CellType) => {
        const { nameVI, currency } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderCurrencyImage(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              {nameVI}
              <Typography noWrap variant='caption'>
                {currency}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'muaTm',
      headerName: t('exchange_rates.buy_tm') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedMuaTm = row.muaTm.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedMuaTm)
              ? formatCurrencyAsStandard(parseFloat(formattedMuaTm), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'muaCk',
      headerName: t('exchange_rates.buy_ck') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedMuaCk = row.muaCk.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedMuaCk)
              ? formatCurrencyAsStandard(parseFloat(formattedMuaCk), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'ban',
      headerName: t('exchange_rates.sell') as string,
      renderCell: ({ row }: CellType) => {
        // Convert '25,801' into '25081' for formatting currency function
        const formattedBan = row.ban.replace(',', '')

        return (
          <Typography noWrap variant='body2'>
            {parseFloat(formattedBan)
              ? formatCurrencyAsStandard(parseFloat(formattedBan), Locale.EN, CurrencyType.VND)
              : '-'}
          </Typography>
        )
      }
    }
  ]

  return (
    <Grid item xs={12}>
      <Card>
        <DataGrid
          autoHeight
          rows={exchangeRates ? exchangeRates.data : []}
          columns={props.customColumns ? props.customColumns : defaultColumns}
          disableRowSelectionOnClick
          getRowId={(row: ExchangeRateType) => `${row.nameVI} - ${row.image}`}

          // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Card>
    </Grid>
  )
}

export default BIDVExchangeRates
