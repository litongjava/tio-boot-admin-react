import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  miniProgress: { position: 'relative', width: '100%', padding: '5px 0' },
  progressWrap: { position: 'relative', backgroundColor: token.colorFillSecondary },
  progress: { width: 0, height: 8, borderRadius: '1px 0 0 1px' },
  target: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 2,
    '& > span': { position: 'absolute', left: 0, width: 2, height: 4 },
    '& > span:first-child': { top: 0 },
    '& > span:last-child': { bottom: 0 },
  },
}));
