import User from '../models/User';

const expressJwt = require('express-jwt');
const config = require('../../config.json');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/login',
            '/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await User.findById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};