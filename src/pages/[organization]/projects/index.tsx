// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProjectsTabType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getProjectDefaultTab } from 'src/utils/router'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Hooks Imports
import { useCurrentOrganization } from 'src/hooks'

const ProjectAvatar = ({ project }: { project: ProjectsTabType }) => {
  const { title, avatar, avatarColor = 'primary' } = project

  if (avatar.length) {
    return <CustomAvatar src={avatar} sx={{ width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={avatarColor} sx={{ width: 38, height: 38 }}>
        {getInitials(title)}
      </CustomAvatar>
    )
  }
}

export const projectDummyData: ProjectsTabType[] = [
  {
    id: 1,
    daysLeft: 28,
    comments: 15,
    totalTask: 344,
    hours: '380/244',
    tasks: '290/344',
    budget: '$18.2k',
    completedTask: 328,
    deadline: '28/2/22',
    chipColor: 'success',
    startDate: '14/2/21',
    budgetSpent: '$24.8k',
    members: '280 members',
    title: 'Social Banners',
    client: 'Christian Jimenez',
    avatar: '/images/icons/project-icons/social-label.png',
    description: 'We are Consulting, Software Development and Web Development Services.',
    avatarGroup: [
      { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
      { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
      { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' }
    ]
  },
  {
    id: 2,
    daysLeft: 15,
    comments: 236,
    totalTask: 90,
    tasks: '12/90',
    hours: '98/135',
    budget: '$1.8k',
    completedTask: 38,
    deadline: '21/6/22',
    budgetSpent: '$2.4k',
    chipColor: 'warning',
    startDate: '18/8/21',
    members: '1.1k members',
    title: 'Admin Template',
    client: 'Jeffrey Phillips',
    avatar: '/images/icons/project-icons/react-label.png',
    avatarGroup: [
      { avatar: '/images/avatars/4.png', name: "Kaith D'souza" },
      { avatar: '/images/avatars/5.png', name: 'John Doe' },
      { avatar: '/images/avatars/6.png', name: 'Alan Walker' }
    ],
    description: "Time is our most valuable asset, that's why we want to help you save it by creating…"
  },
  {
    id: 3,
    daysLeft: 45,
    comments: 98,
    budget: '$420',
    totalTask: 140,
    tasks: '22/140',
    hours: '880/421',
    completedTask: 95,
    chipColor: 'error',
    budgetSpent: '$980',
    deadline: '8/10/21',
    title: 'App Design',
    startDate: '24/7/21',
    members: '458 members',
    client: 'Ricky McDonald',
    avatar: '/images/icons/project-icons/vue-label.png',
    description: 'App design combines the user interface (UI) and user experience (UX).',
    avatarGroup: [
      { avatar: '/images/avatars/7.png', name: 'Jimmy Ressula' },
      { avatar: '/images/avatars/8.png', name: 'Kristi Lawker' },
      { avatar: '/images/avatars/1.png', name: 'Danny Paul' }
    ]
  },
  {
    id: 4,
    comments: 120,
    daysLeft: 126,
    totalTask: 420,
    budget: '2.43k',
    tasks: '237/420',
    hours: '1.2k/820',
    completedTask: 302,
    deadline: '12/9/22',
    budgetSpent: '$8.5k',
    chipColor: 'warning',
    startDate: '10/2/19',
    members: '137 members',
    client: 'Hulda Wright',
    title: 'Create Website',
    avatar: '/images/icons/project-icons/html-label.png',
    description: 'Your domain name should reflect your products or services so that your...',
    avatarGroup: [
      { avatar: '/images/avatars/2.png', name: 'Andrew Tye' },
      { avatar: '/images/avatars/3.png', name: 'Rishi Swaat' },
      { avatar: '/images/avatars/4.png', name: 'Rossie Kim' }
    ]
  },
  {
    id: 5,
    daysLeft: 5,
    comments: 20,
    totalTask: 285,
    tasks: '29/285',
    budget: '28.4k',
    hours: '142/420',
    chipColor: 'error',
    completedTask: 100,
    deadline: '25/12/21',
    startDate: '12/12/20',
    members: '82 members',
    budgetSpent: '$52.7k',
    client: 'Jerry Greene',
    title: 'Figma Dashboard',
    avatar: '/images/icons/project-icons/figma-label.png',
    description: 'Use this template to organize your design project. Some of the key features are…',
    avatarGroup: [
      { avatar: '/images/avatars/5.png', name: 'Kim Merchent' },
      { avatar: '/images/avatars/6.png', name: "Sam D'souza" },
      { avatar: '/images/avatars/7.png', name: 'Nurvi Karlos' }
    ]
  },
  {
    id: 6,
    daysLeft: 4,
    comments: 16,
    budget: '$655',
    totalTask: 290,
    tasks: '29/290',
    hours: '580/445',
    completedTask: 290,
    budgetSpent: '$1.3k',
    chipColor: 'success',
    deadline: '02/11/21',
    startDate: '17/8/21',
    title: 'Logo Design',
    members: '16 members',
    client: 'Olive Strickland',
    avatar: '/images/icons/project-icons/xd-label.png',
    description: 'Premium logo designs created by top logo designers. Create the branding of business.',
    avatarGroup: [
      { avatar: '/images/avatars/8.png', name: 'Kim Karlos' },
      { avatar: '/images/avatars/1.png', name: 'Katy Turner' },
      { avatar: '/images/avatars/2.png', name: 'Peter Adward' }
    ]
  }
]

const Projects = () => {
  const { organizationUniqueName } = useCurrentOrganization()

  return (
    <Grid container spacing={6}>
      {projectDummyData &&
        Array.isArray(projectDummyData) &&
        projectDummyData.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <Card>
                <CardHeader
                  avatar={<ProjectAvatar project={item} />}
                  sx={{
                    pb: 4,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    '& .MuiCardHeader-avatar': { mr: 3 }
                  }}
                  subheader={
                    <Typography sx={{ color: 'text.secondary' }}>
                      <Box component='span' sx={{ fontWeight: 600 }}>
                        Client:
                      </Box>{' '}
                      {item.client}
                    </Typography>
                  }
                  action={
                    <OptionsMenu
                      iconButtonProps={{ size: 'small' }}
                      options={[
                        'Rename Project',
                        'View Details',
                        'Add to Favorites',
                        { divider: true },
                        { text: 'Leave Project', menuItemProps: { sx: { color: 'error.main' } } }
                      ]}
                    />
                  }
                  title={
                    <Typography
                      href={getProjectDefaultTab(organizationUniqueName, item.id)}
                      variant='h6'
                      component={Link}
                      sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      mb: 4,
                      gap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <CustomChip
                      rounded
                      size='small'
                      skin='light'
                      sx={{ height: 60 }}
                      label={
                        <>
                          <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ fontWeight: 600 }}>{item.budgetSpent}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{`/${item.budget}`}</Typography>
                          </Box>
                          <Typography sx={{ color: 'text.secondary' }}>Total Budget</Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1, fontWeight: 600 }}>Start Date:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.startDate}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 1, fontWeight: 600 }}>Deadline:</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.deadline}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                </CardContent>
                <Divider sx={{ my: '0 !important' }} />
                <CardContent sx={{ pt: 6 }}>
                  <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ mr: 1, fontWeight: 600 }}>All Hours:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.hours}</Typography>
                    </Box>
                    <CustomChip size='small' skin='light' color={item.chipColor} label={`${item.daysLeft} days left`} />
                  </Box>
                  <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='caption'>{`Tasks: ${item.completedTask}/${item.totalTask}`}</Typography>
                    <Typography variant='caption'>
                      {`${Math.round((item.completedTask / item.totalTask) * 100)}% Completed`}
                    </Typography>
                  </Box>
                  <LinearProgress
                    color='primary'
                    variant='determinate'
                    value={Math.round((item.completedTask / item.totalTask) * 100)}
                    sx={{
                      mb: 3.5,
                      height: 8,
                      borderRadius: 2,
                      '& .MuiLinearProgress-bar': { borderRadius: 2 }
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AvatarGroup className='pull-up' sx={{ mr: 2 }}>
                        {item.avatarGroup &&
                          item.avatarGroup.map((person, index) => {
                            return (
                              <Tooltip key={index} title={person.name}>
                                <CustomAvatar src={person.avatar} alt={person.name} sx={{ height: 32, width: 32 }} />
                              </Tooltip>
                            )
                          })}
                      </AvatarGroup>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {item.members}
                      </Typography>
                    </Box>
                    <Box
                      href='/'
                      component={Link}
                      onClick={e => e.preventDefault()}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '& svg': { mr: 1, color: 'text.disabled' }
                      }}
                    >
                      <Icon icon='mdi:message-outline' />
                      <Typography sx={{ color: 'text.disabled' }}>{item.comments}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Projects
