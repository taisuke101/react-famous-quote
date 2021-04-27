"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const isAuth = ({ context: { req } }, next) => {
    if (!req.session.userId) {
        throw new apollo_server_errors_1.AuthenticationError('認証されていません！');
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map