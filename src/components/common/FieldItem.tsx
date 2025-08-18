import { LongTextBlock } from '@/components/common/LongTextBlock';
import { Collapse, Image, Space, Typography } from 'antd';
import React from 'react';
import {formatDateTime, isEmpty, isImageURL, isURL, looksLikeDateTime} from "@/components/common/utils";


const { Text } = Typography;
const { Panel } = Collapse;

export type AutoDetailRender = (
  value: any,
  data: Record<string, any>,
  key: string,
) => React.ReactNode;

type Props = {
  k: string;
  v: any;
  labelNode: React.ReactNode;
  record: Record<string, any>;
  renderer?: AutoDetailRender; // 覆盖渲染器（来自 props.renderers 或 props.defaultRenderer）
  copyable: boolean | ((key: string, val: any) => boolean);
  longTextThreshold: number;
};

/** 默认渲染器工厂：安全显示 + URL/图片智能渲染 + JSON 折叠 + 长文本折叠 */
const makeDefaultRender =
  (threshold: number): AutoDetailRender =>
  (val) => {
    if (isEmpty(val)) return <Text type="secondary">-</Text>;
    if (typeof val === 'boolean') return <Text>{val ? 'Yes' : 'No'}</Text>;

    if (Array.isArray(val)) {
      // 注意：避免初始时就 stringify；只在展开后再渲染（性能优化）
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
      return <LongTextBlock text={val} threshold={threshold} />;
    }

    // 普通文本：可折叠
    return <LongTextBlock text={String(val)} threshold={threshold} />;
  };

/** 与容器一致的“整行独占”判定（内部用于复制按钮判定，不影响布局） */
const isLongBlockLocal = (v: any, threshold: number) => {
  if (Array.isArray(v) || (typeof v === 'object' && v !== null)) return true;
  if (typeof v === 'string') {
    if (v.includes('\n')) return true;
    if (isURL(v) && !isImageURL(v) && v.length > threshold) return true;
    if (v.length > threshold) return true;
  }
  return false;
};

const BaseFieldItem: React.FC<Props> = ({
  k,
  v,
  labelNode,
  record,
  renderer,
  copyable,
  longTextThreshold,
}) => {
  const defaultRender = React.useMemo(
    () => makeDefaultRender(longTextThreshold),
    [longTextThreshold],
  );

  const node = (renderer ?? defaultRender)(v, record, k);

  /** 是否显示复制按钮：仅当“会换行/长文本/复杂结构”等时显示 */
  const shouldShowCopyIcon = React.useMemo(() => {
    if (typeof copyable === 'function' && !copyable(k, v)) return false;
    if (copyable === false) return false;
    if (isEmpty(v)) return false;
    return isLongBlockLocal(v, longTextThreshold);
  }, [copyable, k, v, longTextThreshold]);

  return (
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
          <div style={{ marginTop: 0 }}>{node}</div>

          {shouldShowCopyIcon && (
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
  );
};

const FieldItem = React.memo(BaseFieldItem);
export default FieldItem;
