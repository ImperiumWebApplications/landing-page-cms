import { rest } from 'msw';

export const S3MockHandlers = [
  rest.get(/\.s3\.eu-central-1\.amazonaws\.com\//, (_, res, ctx) =>
    res(ctx.status(200)),
  ),
];
