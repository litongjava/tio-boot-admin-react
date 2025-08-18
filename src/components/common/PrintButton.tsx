import { PrinterOutlined } from '@ant-design/icons';
import React from 'react';

type Props = {
  onClick: () => void;
  children?: React.ReactNode; // 按钮文案
};

const PrintButton: React.FC<Props> = ({ onClick, children = 'Print' }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: '1px solid #d9d9d9',
        padding: '4px 12px',
        borderRadius: 6,
        background: '#fff',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <PrinterOutlined />
      {children}
    </button>
  );
};

export default PrintButton;
