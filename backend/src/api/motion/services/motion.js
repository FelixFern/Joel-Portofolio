'use strict';

/**
 * motion service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::motion.motion');
