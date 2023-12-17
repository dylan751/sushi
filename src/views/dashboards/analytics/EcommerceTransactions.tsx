// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface DataType {
  title: string
  imgAlt: string
  imgSrc: string
  amount: string
  subtitle: string
  imgWidth: number
  imgHeight: number
  trendDir: 'up' | 'down'
  avatarColor: ThemeColor
}

const data: DataType[] = [
  {
    imgWidth: 20,
    imgHeight: 22,
    trendDir: 'up',
    title: 'Paypal',
    imgAlt: 'paypal',
    amount: '+$24,820',
    avatarColor: 'error',
    subtitle: 'Received Money',
    imgSrc: '/images/cards/paypal.png'
  },
  {
    imgWidth: 20,
    imgHeight: 15,
    trendDir: 'down',
    amount: '-$1,250',
    title: 'Credit Card',
    imgAlt: 'credit-card',
    avatarColor: 'success',
    subtitle: 'Digital Ocean',
    imgSrc: '/images/cards/credit-card.png'
  },
  {
    imgWidth: 20,
    imgHeight: 15,
    trendDir: 'down',
    amount: '-$99',
    imgAlt: 'atm-card',
    title: 'Mastercard',
    subtitle: 'Netflix',
    avatarColor: 'warning',
    imgSrc: '/images/cards/atm-card.png'
  },
  {
    imgWidth: 20,
    imgHeight: 18,
    amount: '-$82',
    title: 'Wallet',
    imgAlt: 'wallet',
    trendDir: 'down',
    subtitle: "Mac'D",
    avatarColor: 'primary',
    imgSrc: '/images/cards/wallet.png'
  },
  {
    imgWidth: 20,
    imgHeight: 12,
    trendDir: 'up',
    title: 'Transfer',
    amount: '+$8,349',
    subtitle: 'Refund',
    avatarColor: 'info',
    imgAlt: 'arrow-growth',
    imgSrc: '/images/cards/arrow-growth.png'
  }
]

const EcommerceTransactions = () => {
  return (
    <Card>
      <CardHeader
        title='Transactions'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent>
        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 6 } : {})
              }}
            >
              <CustomAvatar skin='light' sx={{ mr: 3 }} variant='rounded' color={item.avatarColor}>
                <img alt={item.imgAlt} src={item.imgSrc} width={item.imgWidth} height={item.imgHeight} />
              </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { color: item.trendDir === 'down' ? 'error.main' : 'success.main' }
                  }}
                >
                  <Typography sx={{ mr: 1, fontWeight: 600 }}>{item.amount}</Typography>
                  <Icon icon={item.trendDir === 'down' ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default EcommerceTransactions
