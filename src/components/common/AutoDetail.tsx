import React from 'react';
import { Card, Col, Collapse, Row, Skeleton, Space, Typography, Image } from 'antd';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

export type AutoDetailRender = (
  value: any,
  data: Record<string, any>,
  key: string,
) => React.ReactNode;

export type AutoDetailProps = {
  data?: Record<string, any> | null;
  loading?: boolean;
  columns?: number;                 // 每行列数（默认 2）
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
};

const prettify = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

const isEmpty = (v: any) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

const looksLikeDateTime = (v: any) =>
  typeof v === 'string' &&
  /\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?/.test(v);

const looksLikeNumber = (v: any) =>
  (typeof v === 'number' && Number.isFinite(v)) ||
  (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v)));

const isURL = (v: any) =>
  typeof v === 'string' &&
  /^https?:\/\/[\w\-]+(\.[\w\-]+)+([/?#].*)?$/i.test(v);

const isImageURL = (v: string) =>
  /^data:image\//i.test(v) ||
  /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(v) ||
  /\/image\/|\/images\/|imgcdn|cloudfront|clerk\.com\/.*\/image/i.test(v);

const formatDateTime = (v: string) => {
  const d = new Date(v.replace(' ', 'T'));
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : v;
};

/** 默认渲染器：安全显示 + URL/图片智能渲染 + JSON 折叠 */
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

  if (typeof val === 'string' && isURL(val)) {
    if (isImageURL(val)) {
      return (
        <>
          <Image src={val} width={220} style={{ maxHeight: 220, objectFit: 'contain' }} placeholder />
          <div style={{ marginTop: 6 }}>
            <a href={val} target="_blank" rel="noreferrer">{val}</a>
          </div>
        </>
      );
    }
    return <a href={val} target="_blank" rel="noreferrer">{val}</a>;
  }

  if (looksLikeNumber(val)) {
    const n = Number(val);
    return Number.isFinite(n) ? <Text>{n.toLocaleString()}</Text> : <Text>{String(val)}</Text>;
  }

  // 长文本友好展示：保留换行、软换行
  return (
    <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {String(val)}
    </Paragraph>
  );
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

  /** 判断该字段是否应“整行独占” */
  const isLongBlock = (k: string, v: any) => {
    if (Array.isArray(v) || (typeof v === 'object' && v !== null)) return true;
    if (typeof v === 'string') {
      if (v.includes('\n')) return true;
      if (isURL(v) && !isImageURL(v) && v.length > longTextThreshold) return true;
      if (v.length > longTextThreshold) return true;
    }
    return false;
  };

  /** 是否显示复制按钮：仅当“会换行/长文本/多行/对象数组”等时显示 */
  const shouldShowCopyIcon = (k: string, v: any) => {
    if (typeof copyable === 'function' && !copyable(k, v)) return false;
    if (copyable === false) return false;
    if (isEmpty(v)) return false;
    // 仅长文本/多行/复杂结构时显示
    return isLongBlock(k, v);
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
            const span = isLongBlock(k, v) ? 24 : baseSpan;

            return (
              <Col key={k} span={span}>
                {/* 每个字段块加边框 */}
                <div
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: 8,
                    padding: 8,
                    background: '#fff',
                  }}
                >
                  <Space align="start" size={8} style={{ width: '100%' }}>
                    <Text>{labelNode}：</Text>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* 值内容：不再使用 Tooltip 包裹 */}
                      <div style={{ marginTop: 0 }}>{node}</div>

                      {/* 仅在“会换行/长文本”等情况显示复制按钮；保留复制 Tooltip */}
                      {shouldShowCopyIcon(k, v) && (
                        <Text
                          style={{ marginTop: 4, display: 'inline-block' }}
                          copyable={{
                            text: String(v),
                            tooltips: ['Copy', 'Copied'],
                          }}
                        >
                          {'\u200b' /* 占位，确保只显示复制图标 */}
                        </Text>
                      )}
                    </div>
                  </Space>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </Card>
  );
};

export default AutoDetail;
