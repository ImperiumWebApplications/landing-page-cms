'use strict';

/**
 * pipedrive-api service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pipedrive-api.pipedrive-api');
