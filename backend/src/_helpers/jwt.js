import User from '../models/User.js';
import expressJwt from 'express-jwt';
import config from '../../config.json';

async function isRevoked(req, payload, done) {
  const user = await User.findById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}

function jwt() {
  const secret = process.env.INSYNC_API_SECRET || config;
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

export default jwt;
