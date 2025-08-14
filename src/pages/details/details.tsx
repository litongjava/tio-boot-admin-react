import AutoDetail from '@/components/common/AutoDetail';
import { getRequest } from '@/utils/apiTable';
import { message } from 'antd';
import React from 'react';
import { useParams } from 'umi';

export default () => {
  const { from, id } = useParams<{ from: string; id: string }>();
  const [data, setData] = React.useState<Record<string, any>>();
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!id || id === ':id') return;
      setLoading(true);
      try {
        const resp = await getRequest(id, { idType: 'long' }, from);
        if (cancelled) return;
        if (resp?.ok) {
          setData(resp.data ?? {});
        } else {
          messageApi.error('Failed to fetch record: ' + id);
        }
      } catch (e) {
        if (!cancelled) messageApi.error('Failed to fetch record: ' + e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, from]);

  return (
    <>
      {contextHolder}
      <AutoDetail
        title={'from:' + from + ', id:' + id}
        data={data}
        loading={loading}
        columns={2}
        hideEmpty={false}
      />
    </>
  );
};
