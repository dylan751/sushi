// ** React Imports
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

interface TableHeaderProps {
  toggle: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle } = props

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
