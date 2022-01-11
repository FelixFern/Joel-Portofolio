'use strict';

/**
 * still service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::still.still');
