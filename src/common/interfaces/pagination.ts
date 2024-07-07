export interface IPagination<T> {
  pageNo: number;
  size: number;
  totalCount: number;
  dataList: T[];
}
