'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL           || 'mongodb://mlab01User:Fit4newyear@ds257470.mlab.com:57470/carreerstrategyprod';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://mlab01User:Fit4newyear@ds225624.mlab.com:25624/carreerstrategy';
exports.PORT = process.env.PORT || 57470;
exports.TEST_PORT = process.env.TEST_PORT || 25624;
exports.JWT_SECRET = process.env.JWT_SECRET || 'mYS#CretSt*ng';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

