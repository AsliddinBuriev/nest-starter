import { IPagination } from '../interfaces';

export class PaginationDto<T> implements IPagination<T> {
  pageNo: number;
  size: number;
  totalCount: number;
  dataList: T[];
  constructor({
    pageNo,
    size,
    totalCount,
    dataList,
  }: {
    pageNo: number;
    size: number;
    totalCount: number;
    dataList: T[];
  }) {
    this.pageNo = pageNo;
    this.size = size;
    this.totalCount = totalCount;
    this.dataList = dataList;
  }
}
