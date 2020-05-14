import User from '../models/User';

const expressJwt = require('express-jwt');
const config = require('../../config.json');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes (no authentication needed)
            // Currently all
            /\/login/,
            /\/user/,
            /\/user\/.*/,
            /\/user\/register/,
            /\/room\/.*/,
            /\/room/
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await User.findById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
};