// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props

  // ** Hooks
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('project_page.category.search_category') as string}
          onChange={e => handleFilter(e.target.value)}
        />

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
