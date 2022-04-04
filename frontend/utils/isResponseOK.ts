import type {
  APIResponse as BackendAPIResponse,
  DataObject,
} from '../backend-api';
import type { APIResponse as PipedriveAPIResponse } from '../pipedrive-api';

export const isContentObjectOK = <T>(res: {
  status: number;
  data: BackendAPIResponse<DataObject<T>>;
}) => res.status >= 200 && res.status < 300 && !!res.data.data;

export const isContentObjectListOK = <T>(res: {
  status: number;
  data: BackendAPIResponse<DataObject<T>[]>;
}) => res.status >= 200 && res.status < 300 && res.data.data.length;

export const isPipedriveDataOK = (res: {
  status: number;
  data: PipedriveAPIResponse<unknown>;
}) => res.status >= 200 && res.status < 300 && res.data.success;
