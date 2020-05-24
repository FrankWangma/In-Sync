import expressJwt from 'express-jwt';
import User from '../models/User.js';

async function isRevoked(req, payload, done) {
  const user = await User.findById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}

function jwt() {
  // Previously a config file was used to provide the secret locally, however that caused issues with
  // nodemon, so a hardcoded string is used instead.
  const secret = process.env.INSYNC_API_SECRET || "local so can use any string";
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes (no authentication needed)
      /\/login/,
      /\/register/,
    ],
  });
}

export default jwt;
