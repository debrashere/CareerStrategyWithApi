'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/career-strategy';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/career-strategy';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'mYS#CretSt*ng';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
