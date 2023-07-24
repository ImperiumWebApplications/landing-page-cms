const fetch = require('node-fetch');
const { ForbiddenError } = require('@strapi/utils').errors;

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    const domain = data.domain;

    if (!domain) {
      throw strapi.errors.badRequest('Domain field is missing');
    }

    if (!data.company_id) {
      const staticContent = await strapi.entityService.findOne(
        'api::static-content.static-content',
        1,
      );
      data.company_id = staticContent.company_id;
    }

    try {
      const response = await fetch(process.env.DOMAIN_AVAILABILITY_LAMBDA, {
        method: 'POST',
        body: JSON.stringify({ domainName: domain }),
        headers: { 'Content-Type': 'application/json' },
      });

      const jsonResponse = await response.json();

      if (jsonResponse.isAlreadyAvailable) {
        return;
      } else if (!jsonResponse.isAlreadyAvailable && jsonResponse.isAvailable) {
        return;
      } else {
        throw new ForbiddenError('Domain is not available');
      }
    } catch (error) {
      throw new ForbiddenError('Error with the API call: ' + error.message);
    }
  },
};
