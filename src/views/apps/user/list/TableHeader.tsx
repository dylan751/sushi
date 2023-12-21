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
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        {t('user_page.export')}
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t('user_page.search_user') as string}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button
          sx={{ mb: 2 }}
          onClick={toggle}
          variant='contained'
          disabled={!ability?.can('create', 'user')}
          startIcon={<Icon icon='mdi:invite' />}
        >
          {t('user_page.add_user')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
