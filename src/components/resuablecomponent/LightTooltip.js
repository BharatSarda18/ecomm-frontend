import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const LightTooltip = styled(({ className,style, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="bottom"
    style={style?style:{}}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F8F7F7',
    color: '#25282B',
    boxShadow: '0px 6px 18px 0px #97979740',
    border: '1px solid #CDCDCD',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    lineHeight: '22px',
    maxHeight: '300px',
    overflowY: 'auto',
    font: 'Montserrat !important',
  },
}));