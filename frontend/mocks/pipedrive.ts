import { rest } from 'msw';
import { PIPEDRIVE_API_URL } from '../interface/pipedrive';
import { currentUser, personFields, personsSearch } from './data/pipedrive';

export const pipedriveAPIMockHandlers = [
  rest.get(PIPEDRIVE_API_URL + '/users/me', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(currentUser)),
  ),
  rest.get(PIPEDRIVE_API_URL + '/personFields', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(personFields)),
  ),
  rest.post(PIPEDRIVE_API_URL + '/personFields', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: req.body })),
  ),
  rest.get(PIPEDRIVE_API_URL + '/persons/search', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(personsSearch)),
  ),
  rest.post(PIPEDRIVE_API_URL + '/persons', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: req.body })),
  ),
];
