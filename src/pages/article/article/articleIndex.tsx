import ApiTable from '@/components/common/ApiTable';
import { systemArticleListColumns } from '@/pages/article/article/articleColumn';
import { listArticleCategory } from '@/pages/article/articleCategory/articleCategoryService';
import { listArticleAuthor } from '@/pages/article/author/authorService';
import { listArticleTag } from '@/pages/article/tag/tagService';
import React from 'react';
// @ts-ignore
import { useNavigate } from 'umi';

export default () => {
  const from = 'tio_boot_admin_article';
  let navigate = useNavigate();

  const beforePageRequest = (params: any, isRecoveryMode?: boolean) => {
    params.idType = 'long';
    params.deleted = isRecoveryMode ? 1 : 0;

    params.titleOp = 'ct';
    params.contentOp = 'ct';
    params.remarkOp = 'ct';

    params.orderBy = 'update_time';
    params.update_time_type = 'string[]';
    params.update_time_to_type = 'ISO8601';
    params.date_type = 'string[]';
    params.date_to_type = 'ISO8601';
    params.lastmod_type = 'string[]';
    params.lastmod_to_type = 'ISO8601';
    params.update_time_op = 'bt';
    params.isAsc = 'false';

    return params;
  };
  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
      date_to_type: 'ISO8601',
      lastmod_to_type: 'ISO8601',
    };
  };

  const editContentAndPreview = {
    title: 'Edit',
    valueType: 'option',
    width: 200,
    render: (text: any, record: any) => [
      <a
        key="editContent"
        onClick={() => navigate('/article/create/' + record.id, { replace: true })}
      >
        Edit Content
      </a>,
      <a key="preView" onClick={() => navigate('/article/' + record.id, { replace: true })}>
        Preview
      </a>,
    ],
  };

  const [articleCategoryOptions, setArticleCategoryOptions] = React.useState([]);
  const [articleAuthorOptions, setArticleAuthorOptions] = React.useState([]);
  const [articleTagOptions, setTagAuthorOptions] = React.useState([]);

  React.useEffect(() => {
    const getArticleCategoryOptions = async () => {
      listArticleCategory().then((respVo) => {
        if (respVo.ok) {
          let options = respVo.data.map((item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id,
          }));
          setArticleCategoryOptions(options);
        } else {
          console.log('Failed to get article category');
        }
      });
      listArticleAuthor().then((respVo) => {
        if (respVo.ok) {
          let options = respVo.data.map((item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id,
          }));
          setArticleAuthorOptions(options);
        } else {
          console.log('Failed to get article category');
        }
      });
      listArticleTag().then((respVo) => {
        if (respVo.ok) {
          let options = respVo.data.map((item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id,
          }));
          setTagAuthorOptions(options);
        } else {
          console.log('Failed to get article category');
        }
      });
    };
    getArticleCategoryOptions();
  }, []);

  const categoryColumns = {
    title: 'Category',
    dataIndex: 'category_id',
    valueType: 'select',
    fieldProps: {
      options: articleCategoryOptions,
    },
  };

  const authorColumns = {
    title: 'Author',
    dataIndex: 'author',
    valueType: 'select',
    fieldProps: {
      options: articleAuthorOptions,
    },
  };

  const tagColumns = {
    title: 'Tag',
    dataIndex: 'tags',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
      options: articleTagOptions,
    },
  };

  const columns = [
    ...systemArticleListColumns(),
    categoryColumns,
    authorColumns,
    tagColumns,
    editContentAndPreview,
  ];

  return (
    <ApiTable
      from={from}
      columns={columns}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
      containsUpload={true}
      uploadCategory={'images'}
    />
  );
};
