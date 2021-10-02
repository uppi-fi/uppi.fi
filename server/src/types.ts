export enum ResponseStatus {
  Ok = "ok",
  Error = "error",
}

export interface BaseResponse<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
}

export enum QueryResultErrorCode {
  NoData = 0,
  NotEmpty = 1,
  Multiple = 2,
}
