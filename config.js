'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL           || 'mongodb://mlab01User:Fit4newyear@ds225624.mlab.com:25624/careerstrategy';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://mlab01User:Fit4newyear@ds225624.mlab.com:25624/careerstrategy';
exports.CAREER_STRATEGY_URL = process.env.CAREER_STRATEGY_URL || 'http://localhost:8080/api';
exports.PORT = process.env.PORT || 57470;
exports.JWT_SECRET = process.env.JWT_SECRET || 'mYS#CretSt*ng';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

