import type {
  APIResponse as BackendAPIResponse,
  DataObject,
} from '../../backend-api';
import type { APIResponse as PipedriveAPIResponse } from '../../pipedrive-api';
import {
  isContentObjectOK,
  isContentObjectListOK,
  isPipedriveDataOK,
} from '../isResponseOK';
import { domainContent, staticContent } from '../../mocks/data/backend-api';

const defaultMeta = {
  pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 },
};

describe('isResponseOK/isContentObjectOK', () => {
  it('should return true for valid response', () => {
    expect(
      isContentObjectOK({
        status: 200,
        data: { ...staticContent, meta: defaultMeta },
      }),
    ).toBeTruthy();
  });

  it('should return false for invalid status code', () => {
    expect(
      isContentObjectOK({
        status: 199,
        data: { ...staticContent, meta: defaultMeta },
      }),
    ).toBeFalsy();
    expect(
      isContentObjectOK({
        status: 300,
        data: { ...staticContent, meta: defaultMeta },
      }),
    ).toBeFalsy();
  });

  it('should return false for invalid data', () => {
    expect(
      isContentObjectOK({
        status: 200,
        data: { meta: defaultMeta } as BackendAPIResponse<DataObject<unknown>>,
      }),
    ).toBeFalsy();
  });
});

describe('isResponseOK/isContentObjectListOK', () => {
  it('should return true for valid response', () => {
    expect(
      isContentObjectListOK({
        status: 200,
        data: { ...domainContent, meta: defaultMeta },
      }),
    ).toBeTruthy();
  });

  it('should return false for invalid status code', () => {
    expect(
      isContentObjectListOK({
        status: 199,
        data: { ...domainContent, meta: defaultMeta },
      }),
    ).toBeFalsy();
    expect(
      isContentObjectListOK({
        status: 300,
        data: { ...domainContent, meta: defaultMeta },
      }),
    ).toBeFalsy();
  });

  it('should return false for invalid data', () => {
    expect(
      isContentObjectListOK({
        status: 200,
        data: { meta: defaultMeta } as BackendAPIResponse<
          DataObject<unknown>[]
        >,
      }),
    ).toBeFalsy();

    expect(
      isContentObjectListOK({
        status: 200,
        data: { data: [], meta: defaultMeta } as BackendAPIResponse<
          DataObject<unknown>[]
        >,
      }),
    ).toBeFalsy();
  });
});

describe('isResponseOK/isPipedriveDataOK', () => {
  it('should return true for valid response', () => {
    expect(
      isPipedriveDataOK({
        status: 200,
        data: { success: true } as PipedriveAPIResponse<unknown>,
      }),
    ).toBeTruthy();
  });

  it('should return false for invalid status code', () => {
    expect(
      isPipedriveDataOK({
        status: 199,
        data: { success: true } as PipedriveAPIResponse<unknown>,
      }),
    ).toBeFalsy();
    expect(
      isPipedriveDataOK({
        status: 300,
        data: { success: true } as PipedriveAPIResponse<unknown>,
      }),
    ).toBeFalsy();
  });

  it('should return false for invalid success code', () => {
    expect(
      isPipedriveDataOK({
        status: 200,
        data: { success: false } as PipedriveAPIResponse<unknown>,
      }),
    ).toBeFalsy();
  });
});
