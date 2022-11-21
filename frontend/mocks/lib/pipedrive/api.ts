import { rest } from 'msw';
import { Pipedrive } from '../../../lib/pipedrive';
import {
  createdLead,
  createdNote,
  currentUser,
  personFields,
  personsSearch,
} from './data';

export const PipedriveMockHandlers = [
  rest.get(Pipedrive.instance.getUri() + '/users/me', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(currentUser)),
  ),
  rest.get(Pipedrive.instance.getUri() + '/personFields', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(personFields)),
  ),
  rest.post(Pipedrive.instance.getUri() + '/personFields', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: req.body })),
  ),
  rest.get(Pipedrive.instance.getUri() + '/persons/search', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(personsSearch)),
  ),
  rest.post(Pipedrive.instance.getUri() + '/persons', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: req.body })),
  ),
  rest.post(Pipedrive.instance.getUri() + '/leads', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: createdLead })),
  ),
  rest.post(Pipedrive.instance.getUri() + '/notes', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true, data: createdNote })),
  ),
];
