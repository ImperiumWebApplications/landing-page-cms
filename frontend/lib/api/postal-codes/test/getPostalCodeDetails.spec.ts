import { getPostalCodeDetails } from '../';
import { Country } from '../../../../config/countries.config';

describe('getPostalCodeDetails', () => {
  it('should return multiple entries for a valid, known postal code', () => {
    expect(getPostalCodeDetails('22303', [Country.Germany])).toEqual([
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5953',
        longitude: '10.0122',
        place: 'Hamburg Winterhude',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5843',
        longitude: '10.0266',
        place: 'Hamburg',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5961',
        longitude: '10.0511',
        place: 'Hamburg Barmbek-Nord',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
    ]);
  });

  it('should return no entries for a valid, unknown postal code', () => {
    expect(getPostalCodeDetails('22222', [Country.Germany])).toEqual([]);
  });

  it('should return no entries for an invalid postal code', () => {
    expect(getPostalCodeDetails('2222', [Country.Germany])).toEqual([]);
  });

  it('should return multiple entries for a valid postal code with several countries', () => {
    expect(
      getPostalCodeDetails('6300', [Country.Germany, Country.Switzerland]),
    ).toEqual([
      {
        community: 'Zug',
        community_code: '1711',
        country_code: 'CH',
        latitude: '47.1685',
        longitude: '8.5035',
        place: 'Zug',
        province: 'Zug',
        province_code: '900',
        state: 'Kanton Zug',
        state_code: 'ZG',
        zipcode: '6300',
      },
      {
        community: 'Zug',
        community_code: '1711',
        country_code: 'CH',
        latitude: '47.1413',
        longitude: '8.532',
        place: 'Zugerberg',
        province: 'Zug',
        province_code: '900',
        state: 'Kanton Zug',
        state_code: 'ZG',
        zipcode: '6300',
      },
    ]);

    expect(
      getPostalCodeDetails('22303', [Country.Germany, Country.Switzerland]),
    ).toEqual([
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5953',
        longitude: '10.0122',
        place: 'Hamburg Winterhude',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5843',
        longitude: '10.0266',
        place: 'Hamburg',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
      {
        community: 'Hamburg, Freie und Hansestadt',
        community_code: '02000',
        country_code: 'DE',
        latitude: '53.5961',
        longitude: '10.0511',
        place: 'Hamburg Barmbek-Nord',
        province: '',
        province_code: '00',
        state: 'Hamburg',
        state_code: 'HH',
        zipcode: '22303',
      },
    ]);
  });
});
