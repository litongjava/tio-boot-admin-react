export type DataItem = VisitDataType;

export interface VisitDataType {
  x: string;
  y: number;
}

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export interface OfflineChartData {
  date: string;
  type: string;
  value: number;
}

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export interface AnalysisData {
  visitData: DataItem[];
  visitData2: DataItem[];
  salesData: DataItem[];
  searchData: SearchDataType[];
  offlineData: OfflineDataType[];
  offlineChartData: OfflineChartData[];
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];
  radarData: RadarData[];
}
