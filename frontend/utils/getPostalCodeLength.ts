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

  const relevantDetails = countryDetails.filter(
    ({ postalCodeLength }) => postalCodeLength > 0,
  );

  if (!relevantDetails.length) return undefined;

  return relevantDetails.reduce((prev, { postalCodeLength }) => {
    return prev < postalCodeLength ? prev : postalCodeLength;
  }, 1000);
};
