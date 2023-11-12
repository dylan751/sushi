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

// ** Hook Imports
import { useTranslation } from 'react-i18next'

// ** Type Imports
import { RoleResponseDto } from 'src/__generated__/AccountifyAPI'

interface TableHeaderProps {
  role: string
  value: string
  allRoles: RoleResponseDto[]
  handleFilter: (val: string) => void
  handleRoleChange: (e: SelectChangeEvent) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { role, handleRoleChange, allRoles, handleFilter, value } = props

  // ** Hooks
  const { t } = useTranslation()

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<Icon icon='mdi:export-variant' />}>
        {t('role_page.user.export')}
      </Button>
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
