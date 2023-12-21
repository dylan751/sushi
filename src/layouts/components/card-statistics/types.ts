// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { OptionsMenuType } from 'src/@core/components/option-menu/types'

export type UserCardStatsHorizontalProps = {
  title: string
  stats: string
  icon: ReactNode
  color?: ThemeColor
}

export type UserCardStatsVerticalProps = {
  title: string
  stats: string
  icon: ReactNode
  subtitle: string
  color?: ThemeColor
  optionsMenuProps?: OptionsMenuType
}

export type UserCardStatsCharacterProps = {
  src: string
  title: string
  stats: string
  chipText: string
  chipColor?: ThemeColor
}
