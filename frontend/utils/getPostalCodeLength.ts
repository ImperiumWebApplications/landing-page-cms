/**
 * Returns the postal code length for a given country.
 * If several countries are provided, it returns the
 * lowest length.
 * @param countryDetails[]
 * @returns number | undefined
 */

export const getPostalCodeLength = (
  countryDetails?: { postalCodeLength: number }[],
) => {
  if (!countryDetails || !countryDetails.length) return undefined;

  return countryDetails.reduce((prev, curr) =>
    prev.postalCodeLength < curr.postalCodeLength ? prev : curr,
  ).postalCodeLength;
};
