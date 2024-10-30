import {ProColumns} from '@ant-design/pro-components';

export const red_book_doamin_redirect_columns = (): ProColumns<any>[] => [
  {
    "title": "name",
    "dataIndex": "name",
    "valueType": "text"
  },
  {
    "title": "src",
    "dataIndex": "src",
    "valueType": "text"
  },
  {
    "title": "dst",
    "dataIndex": "dst",
    "valueType": "textarea"
  },
];
