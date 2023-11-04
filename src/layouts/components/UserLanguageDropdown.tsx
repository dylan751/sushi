import { Fragment, SyntheticEvent, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import Icon from 'src/@core/components/icon'
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

const UserLanguageDropdown = ({ settings }: Props) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<any>(null)

  // ** Hook
  const { i18n } = useTranslation()

  // ** Var
  const { layout } = settings

  const handleLangDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }
  const handleLangDropdownClose = () => {
    setAnchorEl(null)
  }
  const handleLangItemClick = (lang: 'en' | 'ja' | 'vn') => {
    i18n.changeLanguage(lang)
    handleLangDropdownClose()
  }

  return (
    <Fragment>
      <IconButton
        color='inherit'
        aria-haspopup='true'
        aria-controls='customized-menu'
        onClick={handleLangDropdownOpen}
        sx={layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }}
      >
        <Icon icon='mdi:translate' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLangDropdownClose}
        sx={{ '& .MuiMenu-paper': { mt: 4, minWidth: 130 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ py: 2 }} selected={i18n.language === 'en'} onClick={() => handleLangItemClick('en')}>
          English
        </MenuItem>
        <MenuItem sx={{ py: 2 }} selected={i18n.language === 'ja'} onClick={() => handleLangItemClick('ja')}>
          日本語
        </MenuItem>
        <MenuItem sx={{ py: 2 }} selected={i18n.language === 'vn'} onClick={() => handleLangItemClick('vn')}>
          Tiếng Việt
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserLanguageDropdown
