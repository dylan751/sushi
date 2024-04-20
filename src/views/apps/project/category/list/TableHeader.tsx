// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

// ** Type Imports
import { InvoiceType } from 'src/__generated__/AccountifyAPI'

interface TableHeaderProps {
  value: string
  type: InvoiceType | ''
  toggle: () => void
  handleFilterByName: (val: string) => void
  handleFilterByType: (val: InvoiceType | '') => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilterByName, handleFilterByType, toggle, value, type } = props

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('project_page.category.search_category') as string}
          onChange={e => handleFilterByName(e.target.value)}
        />
        <Select
          size='small'
          value={type}
          sx={{ mr: 4, mb: 2 }}
          onChange={e => handleFilterByType(e.target.value as InvoiceType | '')}
          id='select-type'
          labelId='select-type-label'
        >
          <MenuItem value=''>All Types</MenuItem>
          <MenuItem value={InvoiceType.EXPENSE}>Expense</MenuItem>
          <MenuItem value={InvoiceType.INCOME}>Income</MenuItem>
        </Select>
        <Button
          sx={{ mb: 2 }}
          onClick={toggle}
          variant='contained'
          disabled={!ability?.can('create', 'category')}
          startIcon={<Icon icon='mdi:category-outline' />}
        >
          {t('project_page.category.add_category')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
