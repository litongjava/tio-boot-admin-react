import { PrinterOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Image, Row, Skeleton, Space, Typography } from 'antd';
import React from 'react';
import {LongTextBlock} from "@/components/common/LongTextBlock";

const { Text } = Typography;
const { Panel } = Collapse;

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

const prettify = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

const isEmpty = (v: any) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

const looksLikeDateTime = (v: any) =>
  typeof v === 'string' && /\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?/.test(v);

const looksLikeNumber = (v: any) =>
  (typeof v === 'number' && Number.isFinite(v)) ||
  (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v)));

const isURL = (v: any) =>
  typeof v === 'string' && /^https?:\/\/[\w\-]+(\.[\w\-]+)+([/?#].*)?$/i.test(v);

const isImageURL = (v: string) =>
  /^data:image\//i.test(v) ||
  /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(v) ||
  /\/image\/|\/images\/|imgcdn|cloudfront|clerk\.com\/.*\/image/i.test(v);

const formatDateTime = (v: string) => {
  const d = new Date(v.replace(' ', 'T'));
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : v;
};

/** 默认渲染器：安全显示 + URL/图片智能渲染 + JSON 折叠 + 长文本折叠 */
const makeDefaultRender =
  (threshold: number): AutoDetailRender =>
  (val) => {
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
            <Image
              src={val}
              width={220}
              style={{ maxHeight: 260, objectFit: 'contain' }}
              placeholder
            />
            <div style={{ marginTop: 6 }}>
              <a href={val} target="_blank" rel="noreferrer">
                {val}
              </a>
            </div>
          </>
        );
      }
      // 很长的 URL 也可以折叠（交给 LongTextBlock）
      return <LongTextBlock text={val} threshold={threshold} />;
    }

    if (looksLikeNumber(val)) {
      const n = Number(val);
      return Number.isFinite(n) ? <Text>{n.toLocaleString()}</Text> : <Text>{String(val)}</Text>;
    }

    // 普通文本：可折叠
    return <LongTextBlock text={String(val)} threshold={threshold} />;
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

  /** 是否显示复制按钮：仅当“会换行/长文本/复杂结构”等时显示 */
  const shouldShowCopyIcon = (k: string, v: any) => {
    if (typeof copyable === 'function' && !copyable(k, v)) return false;
    if (copyable === false) return false;
    if (isEmpty(v)) return false;
    return isLongBlock(k, v);
  };

  /** —— 打印：构建打印 HTML —— */
  const buildPrintHTML = React.useCallback(
    (dataObj: Record<string, any>) => {
      const escapeHTML = (s: any) =>
        String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const rows = keys
        .filter((k) => !(hideEmpty && isEmpty((dataObj as any)[k])))
        .map((k) => {
          const raw = (dataObj as any)[k];
          let val: string;

          if (raw === null || raw === undefined || (typeof raw === 'string' && raw.trim() === '')) {
            val = '-';
          } else if (Array.isArray(raw) || (typeof raw === 'object' && raw !== null)) {
            val = `<pre style="white-space:pre-wrap;margin:0">${escapeHTML(
              JSON.stringify(raw, null, 2),
            )}</pre>`;
          } else if (typeof raw === 'boolean') {
            val = raw ? 'Yes' : 'No';
          } else if (typeof raw === 'string' && isURL(raw)) {
            if (isImageURL(raw)) {
              val = `<div style="display:flex;flex-direction:column;gap:6px">
                       <img src="${escapeHTML(
                         raw,
                       )}" style="max-width:260px;max-height:260px;object-fit:contain;border:1px solid #eee;border-radius:6px" />
                       <a href="${escapeHTML(raw)}" target="_blank" rel="noreferrer">${escapeHTML(
                         raw,
                       )}</a>
                     </div>`;
            } else {
              val = `<a href="${escapeHTML(raw)}" target="_blank" rel="noreferrer">${escapeHTML(
                raw,
              )}</a>`;
            }
          } else {
            val = escapeHTML(raw);
          }

          const label = titleMap?.[k] !== undefined ? escapeHTML(String(titleMap[k])) : prettify(k);

          return `<tr>
            <th style="vertical-align:top;padding:8px 10px;border:1px solid #e5e5e5;background:#fafafa;width:220px">${label}</th>
            <td style="padding:8px 10px;border:1px solid #e5e5e5">${val}</td>
          </tr>`;
        })
        .join('');

      const docTitle =
        (typeof printTitle === 'string' && printTitle) ||
        (typeof title === 'string' && title) ||
        (dataObj?.id ? String(dataObj.id) : 'Detail');

      return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHTML(docTitle)}</title>
<style>
  @page { size: A4; margin: 16mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji'; color:#111; }
  h1 { font-size: 20px; margin: 0 0 16px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; }
  a { color: #1677ff; text-decoration: none; word-break: break-all; }
  pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
  .header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; }
  .meta { color:#888; font-size:12px; }
  @media print {
    .noprint { display:none; }
  }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHTML(docTitle)}</h1>
    <div class="meta">Generated at ${escapeHTML(new Date().toLocaleString())}</div>
  </div>
  <table>${rows}</table>
  <script>
    function allImgsLoaded() {
      const imgs = Array.from(document.images || []);
      if (imgs.length === 0) return Promise.resolve();
      return Promise.allSettled(imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => { img.onload = img.onerror = res; });
      }));
    }
    allImgsLoaded().then(() => { window.print(); });
  </script>
</body>
</html>`;
    },
    [keys, hideEmpty, titleMap, title, printTitle],
  );

  const handlePrint = React.useCallback(() => {
    const win = window.open('', '_blank');
    if (!win) return;
    const html = buildPrintHTML(record);
    win.document.open();
    win.document.write(html);
    win.document.close();
  }, [buildPrintHTML, record]);

  const defaultRender = React.useMemo(
    () => makeDefaultRender(longTextThreshold),
    [longTextThreshold],
  );

  return (
    <Card
      title={title}
      bordered
      style={style}
      extra={
        printable ? (
          <Button icon={<PrinterOutlined />} onClick={handlePrint}>
            {printButtonText}
          </Button>
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
            const renderer = renderers?.[k] ?? defaultRenderer ?? defaultRender;
            const node = renderer(v, record, k);
            const span = isLongBlock(k, v) ? 24 : baseSpan;

            return (
              <Col key={k} span={span}>
                {/* 每个字段块边框 */}
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
                      {/* 值内容：无外层 Tooltip */}
                      <div style={{ marginTop: 0 }}>{node}</div>

                      {/* 仅“会换行/长文本/复杂结构”等显示复制按钮 */}
                      {shouldShowCopyIcon(k, v) && (
                        <Text
                          style={{ marginTop: 4, display: 'inline-block' }}
                          copyable={{
                            text: String(v),
                            tooltips: ['Copy', 'Copied'],
                          }}
                        >
                          {'\u200b'}
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
