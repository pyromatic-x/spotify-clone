import { styled } from '@mui/system';
import MainContainer from '../common/MainContainer';
import { IconButton } from '@mui/material';

export const Container = styled(MainContainer)({
  gridArea: 'rightbar',
  minWidth: '420px',
  maxWidth: '420px',
  marginLeft: '8px',
  position: 'relative',
});

export const CloseIconWrapper = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 10,

  '& .MuiSvgIcon-root': {
    width: '1.4rem',
    height: '1.4rem',
    color: theme.palette.secondary.main,
  },
}));
