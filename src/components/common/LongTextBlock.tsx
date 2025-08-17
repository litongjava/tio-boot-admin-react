import { Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography;

/** 可折叠长文本渲染 */
export const LongTextBlock: React.FC<{
  text: string;
  threshold: number;
}> = ({ text, threshold }) => {
  const [open, setOpen] = React.useState(false);
  const isLong = text.length > threshold || text.includes('\n');

  if (!isLong) {
    return (
      <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {text}
      </Paragraph>
    );
  }

  const preview = text.slice(0, threshold);

  return (
    <div>
      <Paragraph style={{ marginBottom: 6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {open ? text : preview + '…'}
      </Paragraph>
      <a onClick={() => setOpen(!open)}>{open ? 'Collapse' : 'Show more'}</a>
    </div>
  );
};
