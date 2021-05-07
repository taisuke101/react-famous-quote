"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const typeorm_1 = require("typeorm");
const testConnection = (drop = false) => {
    return typeorm_1.createConnection({
        name: 'test',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'taisuke',
        password: '3Mumyouken3',
        database: 'famous_quote_test',
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + '../entities/**/*.ts'],
    });
};
exports.testConnection = testConnection;
//# sourceMappingURL=testConnection.js.map