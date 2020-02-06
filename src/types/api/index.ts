export interface ApiResponse {
  err: number;
  errmsg: null | string;
  data: any;
}

export interface KeepAliveResponse extends ApiResponse {

}
