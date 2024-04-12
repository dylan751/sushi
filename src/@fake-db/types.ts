// Template Search

import { ThemeColor } from 'src/@core/layouts/types'

//----------------
export type AppBarSearchType = {
  id: number
  url: string
  icon: string
  title: string
  category: string
}

export type ProjectsTabType = {
  id: number
  hours: string
  tasks: string
  title: string
  budget: string
  client: string
  avatar: string
  members: string
  daysLeft: number
  comments: number
  deadline: string
  startDate: string
  totalTask: number
  budgetSpent: string
  description: string
  chipColor: ThemeColor
  completedTask: number
  avatarColor?: ThemeColor
  avatarGroup: ProfileAvatarGroupType[]
}

export type ProfileAvatarGroupType = {
  name: string
  avatar: string
}
