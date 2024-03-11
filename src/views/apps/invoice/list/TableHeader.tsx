// ** Next Import
import Link from 'next/link'

// ** React Import
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { GridRowId } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

// ** Utils Imports
import { getOrgUniqueName } from 'src/utils/organization'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, selectedRows, handleFilter } = props

  // ** Utils
  const uniqueName = getOrgUniqueName()

  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

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
      <Select
        size='small'
        displayEmpty
        defaultValue=''
        sx={{ mr: 4, mb: 2 }}
        disabled={selectedRows && selectedRows.length === 0}
        renderValue={selected => (selected.length === 0 ? t('invoice_page.list.actions') : selected)}
      >
        <MenuItem disabled>{t('invoice_page.list.actions')}</MenuItem>
        <MenuItem value='Delete'>Delete</MenuItem>
        <MenuItem value='Edit'>Edit</MenuItem>
        <MenuItem value='Send'>Send</MenuItem>
      </Select>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('invoice_page.list.search_invoice') as string}
          onChange={e => handleFilter(e.target.value)}
        />
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
