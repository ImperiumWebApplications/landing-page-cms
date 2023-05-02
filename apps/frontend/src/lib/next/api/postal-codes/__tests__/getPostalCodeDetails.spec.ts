import { getPostalCodeDetails } from '..';
import { Country } from '../../../../../config/i18n.config';

describe('getPostalCodeDetails', () => {
  it('should return multiple entries for a valid, known postal code', () => {
    expect(
      getPostalCodeDetails({ code: '22303', countries: [Country.Germany] }),
    ).toEqual([
      {
        place: 'Hamburg Winterhude',
        code: '22303',
      },
      {
        place: 'Hamburg',
        code: '22303',
      },
      {
        place: 'Hamburg Barmbek-Nord',
        code: '22303',
      },
    ]);
  });

  it('should return no entries for a valid, unknown postal code', () => {
    expect(
      getPostalCodeDetails({ code: '22222', countries: [Country.Germany] }),
    ).toEqual([]);
  });

  it('should return no entries for an invalid postal code', () => {
    expect(
      getPostalCodeDetails({ code: '2222', countries: [Country.Germany] }),
    ).toEqual([]);
  });

  it('should return multiple entries for a valid postal code with several countries', () => {
    expect(
      getPostalCodeDetails({
        code: '6300',
        countries: [Country.Germany, Country.Switzerland],
      }),
    ).toEqual([
      {
        place: 'Zug',
        code: '6300',
      },
      {
        place: 'Zugerberg',
        code: '6300',
      },
    ]);

    expect(
      getPostalCodeDetails({
        code: '22303',
        countries: [Country.Germany, Country.Switzerland],
      }),
    ).toEqual([
      {
        place: 'Hamburg Winterhude',
        code: '22303',
      },
      {
        place: 'Hamburg',
        code: '22303',
      },
      {
        place: 'Hamburg Barmbek-Nord',
        code: '22303',
      },
    ]);
  });
});
