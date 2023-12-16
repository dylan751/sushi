// React Imports
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Type Imports
import { RoleResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  role: string
  value: string
  allRoles: RoleResponseDto[]
  handleFilter: (val: string) => void
  handleRoleChange: (e: SelectChangeEvent) => void
  toggleAddUserDrawer: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { role, handleRoleChange, allRoles, handleFilter, value, toggleAddUserDrawer } = props

  // ** Hooks
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          sx={{ mr: 4, mb: 2 }}
          color='secondary'
          variant='outlined'
          startIcon={<Icon icon='mdi:export-variant' />}
        >
          {t('role_page.user.export')}
        </Button>
        {ability?.can('create', 'user') && (
          <Button
            sx={{ mr: 4, mb: 2 }}
            color='primary'
            variant='contained'
            startIcon={<Icon icon='mdi:invite' />}
            onClick={() => toggleAddUserDrawer()}
          >
            {t('role_page.user.add_user')}
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder={t('role_page.user.search_user').toString()}
          sx={{ mr: 4, mb: 2 }}
          onChange={e => handleFilter(e.target.value)}
        />
        <FormControl size='small' sx={{ mb: 2 }}>
          <InputLabel id='role-select'>{t('role_page.user.select_role')}</InputLabel>
          <Select
            size='small'
            value={role}
            id='select-role'
            label={t('role_page.user.select_role')}
            labelId='role-select'
            onChange={handleRoleChange}
            inputProps={{ placeholder: `${t('role_page.user.select_role')}` }}
          >
            <MenuItem value=''>{t('role_page.user.select_role')}</MenuItem>
            {allRoles.map(role => (
              <MenuItem value={role.slug} key={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
