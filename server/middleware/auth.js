// import dependencies
const { expressjwt : jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { audience, domain } = require("../config/config");

// Middleware to validate the JWT using express-jwt
const checkJwt = jwt({
	// Provide a signing key based on the key identifier in the header and the signing keys provided by the Auth0 JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${domain}/.well-known/jwks.json`,
	}),

	// Validate the audience (Identifier) and the issuer (Domain).
	audience,
	issuer: `https://${domain}/`,
	algorithms: ["RS256"],
});

module.exports = checkJwt;
