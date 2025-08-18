import { PrinterOutlined } from '@ant-design/icons';
import { Card, Col, Row, Skeleton } from 'antd';
import React from 'react';

import FieldItem from '@/components/common/FieldItem';
import { buildPrintHTML, isEmpty, isImageURL, isURL, prettify } from './utils';

export type AutoDetailRender = (
  value: any,
  data: Record<string, any>,
  key: string,
) => React.ReactNode;

export type AutoDetailProps = {
  data?: Record<string, any> | null;
  loading?: boolean;
  columns?: number; // 每行列数（默认 2）
  hideEmpty?: boolean;
  order?: string[];
  hiddenKeys?: string[];
  titleMap?: Record<string, React.ReactNode>;
  renderers?: Record<string, AutoDetailRender>;
  defaultRenderer?: AutoDetailRender;
  copyable?: boolean | ((key: string, val: any) => boolean);
  title?: React.ReactNode;
  style?: React.CSSProperties;

  /** 触发“整行独占”的长度阈值（默认 80） */
  longTextThreshold?: number;

  /** 打印功能 */
  printable?: boolean; // 默认 true
  printTitle?: string; // 打印页标题
  printButtonText?: string; // 打印按钮文案，默认 "Print"
};

const AutoDetail: React.FC<AutoDetailProps> = ({
  data,
  loading,
  columns = 2,
  hideEmpty = false,
  order,
  hiddenKeys = [],
  titleMap,
  renderers,
  defaultRenderer,
  copyable = true,
  title,
  style,
  longTextThreshold = 80,
  printable = true,
  printTitle,
  printButtonText = 'Print',
}) => {
  const record = data ?? {};

  // key 顺序：order 优先，其余字母序
  const keys = React.useMemo(() => {
    const all = Object.keys(record || {});
    const hidden = new Set(hiddenKeys);
    const remain = all.filter((k) => !hidden.has(k));
    if (order && order.length) {
      const orderSet = new Set(order);
      const inOrder = order.filter((k) => remain.includes(k));
      const notInOrder = remain.filter((k) => !orderSet.has(k)).sort();
      return [...inOrder, ...notInOrder];
    }
    return remain.sort();
  }, [record, order, hiddenKeys]);

  const baseSpan = Math.max(1, Math.min(24, Math.floor(24 / Math.max(1, columns))));

  /** 判断该字段是否应“整行独占”，与 FieldItem 的判定保持一致 */
  const isLongBlock = (k: string, v: any) => {
    if (Array.isArray(v) || (typeof v === 'object' && v !== null)) return true;
    if (typeof v === 'string') {
      if (v.includes('\n')) return true;
      if (isURL(v) && !isImageURL(v) && v.length > longTextThreshold) return true;
      if (v.length > longTextThreshold) return true;
    }
    return false;
  };

  /** 打印 */
  const handlePrint = React.useCallback(() => {
    const win = window.open('', '_blank');
    if (!win) return;
    const html = buildPrintHTML({
      dataObj: record,
      keys,
      hideEmpty,
      titleMap,
      title,
      printTitle,
    });
    win.document.open();
    win.document.write(html);
    win.document.close();
  }, [record, keys, hideEmpty, titleMap, title, printTitle]);

  return (
    <Card
      title={title}
      bordered
      style={style}
      extra={
        printable ? (
          <button
            onClick={handlePrint}
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
            {printButtonText}
          </button>
        ) : null
      }
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <Row gutter={[16, 12]}>
          {keys.map((k) => {
            const v = (record as any)[k];
            if (hideEmpty && isEmpty(v)) return null;

            const labelNode = titleMap?.[k] ?? prettify(k);
            const renderer = renderers?.[k] ?? defaultRenderer;

            const span = isLongBlock(k, v) ? 24 : baseSpan;

            return (
              <Col key={k} span={span}>
                <FieldItem
                  k={k}
                  v={v}
                  labelNode={labelNode}
                  record={record}
                  renderer={renderer}
                  copyable={copyable}
                  longTextThreshold={longTextThreshold}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </Card>
  );
};

export default AutoDetail;
