import { Card, Col, Collapse, Row, Skeleton, Space, Tooltip, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;
const { Panel } = Collapse;

export type AutoDetailRender = (
  value: any,
  data: Record<string, any>,
  key: string,
) => React.ReactNode;

export type AutoDetailProps = {
  /** 详情数据 */
  data?: Record<string, any> | null;
  /** 加载态 */
  loading?: boolean;
  /** 每行列数（默认 2） */
  columns?: number;
  /** 是否隐藏空值（null/undefined/''） */
  hideEmpty?: boolean;
  /** 字段显示顺序（可选），不在其中的字段按字母序排在后面 */
  order?: string[];
  /** 隐藏字段 */
  hiddenKeys?: string[];
  /** 字段标题映射（可选） */
  titleMap?: Record<string, React.ReactNode>;
  /** 自定义渲染器 */
  renderers?: Record<string, AutoDetailRender>;
  /** 全局兜底渲染器（可选） */
  defaultRenderer?: AutoDetailRender;
  /** 文本是否可复制（默认 true） */
  copyable?: boolean | ((key: string, val: any) => boolean);
  /** 卡片标题（可选） */
  title?: React.ReactNode;
  /** 自定义外层样式 */
  style?: React.CSSProperties;
};

const prettify = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

const isEmpty = (v: any) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

const looksLikeDateTime = (v: any) =>
  typeof v === 'string' && /\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?/.test(v);

const looksLikeNumber = (v: any) =>
  (typeof v === 'number' && Number.isFinite(v)) ||
  (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v)));

const formatDateTime = (v: string) => {
  // 尽量宽松的解析
  const d = new Date(v.replace(' ', 'T'));
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : v;
};

const defaultRender: AutoDetailRender = (val) => {
  if (isEmpty(val)) return <Text type="secondary">-</Text>;
  if (typeof val === 'boolean') return <Text>{val ? 'Yes' : 'No'}</Text>;
  if (Array.isArray(val)) {
    return (
      <Collapse ghost>
        <Panel header={<Text>Array[{val.length}]</Text>} key="arr">
          <pre style={{ margin: 0 }}>{JSON.stringify(val, null, 2)}</pre>
        </Panel>
      </Collapse>
    );
  }
  if (typeof val === 'object') {
    return (
      <Collapse ghost>
        <Panel header={<Text>Object</Text>} key="obj">
          <pre style={{ margin: 0 }}>{JSON.stringify(val, null, 2)}</pre>
        </Panel>
      </Collapse>
    );
  }
  if (looksLikeDateTime(val)) return <Text>{formatDateTime(val)}</Text>;
  if (looksLikeNumber(val)) {
    const n = Number(val);
    return Number.isFinite(n) ? <Text>{n.toLocaleString()}</Text> : <Text>{String(val)}</Text>;
  }
  return <Text>{String(val)}</Text>;
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
}) => {
  const record = data ?? {};

  // 组装 key 列表：order 优先，其余按字母序
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

  const span = Math.max(1, Math.min(24, Math.floor(24 / Math.max(1, columns))));

  const shouldCopy = (k: string, v: any) => {
    if (typeof copyable === 'function') return copyable(k, v);
    if (copyable === false) return false;
    // 默认：字符串或可转字符串的基础类型允许复制
    return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
  };

  return (
    <Card title={title} bordered style={style}>
      {loading ? (
        <Skeleton active />
      ) : (
        <Row gutter={[16, 12]}>
          {keys.map((k) => {
            const v = (record as any)[k];
            if (hideEmpty && isEmpty(v)) return null;

            const labelNode = titleMap?.[k] ?? prettify(k);
            const renderer = renderers?.[k] ?? defaultRenderer ?? defaultRender;
            const node = renderer(v, record, k);

            return (
              <Col key={k} span={span}>
                <Space align="start" size={8} style={{ width: '100%' }}>
                  <Text>{labelNode}：</Text>
                  <Tooltip title={String(isEmpty(v) ? '-' : v)}>
                    <Text
                      style={{ wordBreak: 'break-word', flex: 1 }}
                      copyable={shouldCopy(k, v) ? { text: String(v) } : undefined}
                    >
                      {node}
                    </Text>
                  </Tooltip>
                </Space>
              </Col>
            );
          })}
        </Row>
      )}
    </Card>
  );
};

export default AutoDetail;
