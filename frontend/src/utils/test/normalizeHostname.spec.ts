import { normalizeHostname } from '../normalizeHostname';

describe('normalizeHostname', () => {
  it('should return host without modification', () => {
    const host = 'leadquelle.ch';
    expect(normalizeHostname(host)).toEqual('leadquelle.ch');
  });

  it('should return host with removed www', () => {
    const host = 'www.leadquelle.ch';
    expect(normalizeHostname(host)).toEqual('leadquelle.ch');
  });

  it('should return strange host with removed www', () => {
    const host = 'www.lea.www.lead.ch.www';
    expect(normalizeHostname(host)).toEqual('lea.www.lead.ch.www');
  });

  it('should return strange host with removed www', () => {
    const host = '';
    expect(normalizeHostname(host)).toEqual(undefined);
  });
});
