import User from '../models/User';

const expressJwt = require('express-jwt');
const config = require('../../config.json');

async function isRevoked(req, payload, done) {
  const user = await User.findById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes (no authentication needed)
      // Currently all
      /\//,
      /\/login/,
      /\/user/,
      /\/user\/.*/,
      /\/user\/register/,
      /\/room\/.*/,
      /\/room/,
    ],
  });
}

module.exports = jwt;
