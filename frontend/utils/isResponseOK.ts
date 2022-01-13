import { APIResponse, DataObject } from '../backend-api';

export const isContentObjectOK = <T>(res: {
  status: number;
  data: APIResponse<DataObject<T>>;
}) => res.status >= 200 && res.status < 300 && res.data.data;

export const isContentObjectListOK = <T>(res: {
  status: number;
  data: APIResponse<DataObject<T>[]>;
}) => res.status >= 200 && res.status < 300 && res.data.data.length;
