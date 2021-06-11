"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wwwRedirect = exports.httpsRedirect = void 0;
const isSecure = (req) => {
    if (req.secure) {
        return true;
    }
    if (req.headers['x-arr-log-id']) {
        return typeof req.headers['x-arr-ssl'] === 'string';
    }
    return req.headers['x-forwarded-proto'] === 'https';
};
const httpsRedirect = (redirectLocalhost = false) => (req, res, next) => {
    if (req.hostname === 'localhost' && !redirectLocalhost) {
        return next();
    }
    if (isSecure(req)) {
        return next();
    }
    return res.redirect(`https://${req.hostname}${req.originalUrl}`);
};
exports.httpsRedirect = httpsRedirect;
const wwwRedirect = () => (req, res, next) => {
    if (req.headers &&
        req.headers.host &&
        req.headers.host.match &&
        req.headers.host.match(/^www/) !== null) {
        res.redirect(`https://${req.headers.host.replace(/^www\./, '')}${req.url}`);
    }
    next();
};
exports.wwwRedirect = wwwRedirect;
//# sourceMappingURL=httpsRedirect.js.map