import { styled } from '@mui/material/styles'
import { Radio } from '@mui/material'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '2px',
  width: 13,
  height: 13,
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  'input:disabled ~ &': {
    background: theme.colors.foreground,
  },
}))

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.colors.primary,

  'input:hover ~ &': {
    backgroundColor: theme.colors.primary,
  },
}))

const StyledRadioButton = (props: any) => {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color='default'
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  )
}

export default StyledRadioButton
