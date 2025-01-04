import {ProColumns} from '@ant-design/pro-components';

export const rumi_rmp_school_columns = (): ProColumns<any>[] => [
  {
    "title": "Avg Rating Rounded",
    "dataIndex": "avg_rating_rounded",
    "valueType": "text"
  },
  {
    "title": "City",
    "dataIndex": "city",
    "valueType": "text"
  },
  {
    "title": "Country",
    "dataIndex": "country",
    "valueType": "text"
  },
  {
    "title": "Legacy Id",
    "dataIndex": "legacy_id",
    "valueType": "text"
  },
  {
    "title": "Name",
    "dataIndex": "name",
    "valueType": "text"
  },
  {
    "title": "Num Ratings",
    "dataIndex": "num_ratings",
    "valueType": "text"
  },
  {
    "title": "State",
    "dataIndex": "state",
    "valueType": "text"
  },
  {
    "title": "Remark",
    "dataIndex": "remark",
    "valueType": "text"
  },
  {
    title: "update_time",
    dataIndex: "update_time",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: "update_time",
    title: "update_time",
    dataIndex: "update_time_range",
    valueType: "dateTimeRange",
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
