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

import convert from 'xml-js'

export interface VCBExrateType {
  _attributes: {
    Buy: string
    CurrencyCode: string
    CurrencyName: string
    Sell: string
    Transfer: string
  }
}

export interface VCBExrateListType {
  DateTime: { _text: string }
  Exrate: VCBExrateType[]
  Source: { _text: string }
}

export interface VCBResponseType {
  ExrateList: VCBExrateListType
  _comment: string
  _declaration: any
}

interface CellType {
  row: VCBExrateType
}

const renderCurrencyImage = (row: VCBExrateType) => {
  return (
    <CustomAvatar skin='light' color='primary' sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
      {getInitials(row._attributes.CurrencyCode ? row._attributes.CurrencyCode : 'USD')}
    </CustomAvatar>
  )
}

export interface VCBExchangeRatesProps {
  customColumns?: GridColDef[]
}

const VCBExchangeRates = (props: VCBExchangeRatesProps) => {
  // ** States
  const [exchangeRates, setExchangeRates] = useState<VCBResponseType>()

  // ** Hooks
  const { t } = useTranslation()

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const res = await axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx')
        const jsonResult = convert.xml2json(res.data, {
          compact: true,
          spaces: 2
        })

        setExchangeRates(JSON.parse(jsonResult))
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
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderCurrencyImage(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              {row._attributes.CurrencyName}
              <Typography noWrap variant='caption'>
                {row._attributes.CurrencyCode}
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
        const formattedMuaTm = row._attributes.Buy.replace(',', '')

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
        const formattedMuaCk = row._attributes.Transfer.replace(',', '')

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
        const formattedBan = row._attributes.Sell.replace(',', '')

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
          rows={exchangeRates ? exchangeRates.ExrateList.Exrate : []}
          columns={props.customColumns ? props.customColumns : defaultColumns}
          disableRowSelectionOnClick
          getRowId={(row: VCBExrateType) => `${row._attributes.CurrencyName} - ${row._attributes.CurrencyCode}`}

          // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        />
      </Card>
    </Grid>
  )
}

export default VCBExchangeRates
