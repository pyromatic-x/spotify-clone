import { Box, ListItem, styled } from '@mui/material';

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'firstSelected' && prop !== 'lastSelected',
})<{ selected?: boolean; firstSelected?: boolean; lastSelected?: boolean }>(
  ({ theme, selected, firstSelected, lastSelected }) => ({
    position: 'relative',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',

    '& img': {
      transition: 'none',
    },

    '&:hover': {
      backgroundColor: theme.palette.hover.button,

      '& img': {
        filter: 'brightness(0.7)',
      },

      '& a': {
        color: theme.palette.common.white,
      },

      '& [class*=IconWrapper], & [class*=MoreWrapper]': {
        opacity: 1,
      },
    },
    '&:active': {
      backgroundColor: theme.palette.common.black,
    },

    ...(selected && {
      backgroundColor: '#232323',

      ...(firstSelected &&
        !lastSelected && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }),
      ...(!firstSelected &&
        lastSelected && {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }),
      ...(!firstSelected &&
        !lastSelected && {
          borderRadius: 0,
        }),

      '&:hover': {
        backgroundColor: '#393939',

        '& img': {
          filter: 'brightness(0.7)',
        },

        '& [class*=IconWrapper], & [class*=MoreWrapper]': {
          opacity: 1,
        },
      },
    }),

    '&.on-drag-over-top::before': {
      content: "''",
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: theme.palette.green,
    },
    '&.on-drag-over-bottom::after': {
      content: "''",
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: theme.palette.green,
    },

    '&.on-dragged': {
      backgroundColor: '#2b2b2b !important',
    },
  }),
);

export const IconWrapper = styled(Box, {
  label: 'IconWrapper',
})({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
});

export const MoreWrapper = styled(Box, {
  label: 'MoreWrapper',
})(({ theme }) => ({
  position: 'relative',
  opacity: 0,
  padding: 0,

  '& svg': {
    color: theme.palette.secondary.main,
  },

  '&:hover svg': {
    color: theme.palette.common.white,
  },
}));
