module.exports = {
    "extends": [
      "airbnb-base",
    ],
    "env": {
      "node": true
    },
    "rules": {
      "max-len": [
        "warn",
        {
          "code": 100,
          "tabWidth": 2,
          "comments": 100,
          "ignoreComments": false,
          "ignoreTrailingComments": true,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true
        }
      ],
      "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
      "no-underscore-dangle": "off" // __MONGO_URI__, _id, etc.
    }
  }
  