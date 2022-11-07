let { expressjwt: jwt } = require("express-jwt");

async function isRevoked(req, payload) {
  if (!payload.payload.isAdmin) {
    return payload !== "undefined";
  }
}

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      // // { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/v1\/users(.*)/, methods: ["POST", "GET", "OPTIONS"] },
      // `${api}/users/login`,
      // `${api}/users/register`,
      // { url: /public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      // `${api}/agents`,
      // `${api}/agents/login`,
      // { url: /\/api\/v1\/students(.*)/, methods: ["POST", "GET", "OPTIONS"] },
      // { url: /\/api\/v1\/cities(.*)/, methods: ["POST", "GET", "OPTIONS"] },
      // Inventory
      {
        url: /\/api\/v1\/manufacturers(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/items(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/transactions(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/transactionDetails(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/itemDetails(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
      {
        url: /\/api\/v1\/rmas(.*)/,
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
      },
    ],
  });
}

module.exports = authJwt;
