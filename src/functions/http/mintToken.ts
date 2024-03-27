import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import jwt from "jsonwebtoken";
import { KeyObject } from "crypto";


export default async function mintToken(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { email = "" } = request.queryParams; // Extract email from query parameters

  console.log("Query params: ", request.queryParams);
  console.log("Email: ", email);

  // test
  console.log(KeyObject);

  const secret = YEXT_API_KEY_SECRET;
  const alg = "HS256";
  const kid = YEXT_API_KEY_ID
  console.log("secret: ", secret, "\nkey: ", kid)
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  console.log("iat: ", iat);
  const body = {
    aud: ["/v2/accounts/me/search"],
    query: {
      identity: JSON.stringify({
        externalIdentities: [
          {
            source: "auth0",
            identities: [email],
          },
        ],
      }),
    },
    iat: iat,
    exp: exp,
  };
  const token = jwt.sign(body, secret, {
    header: { alg, kid },
  });

  return {
    body: JSON.stringify({ token }),
    headers: {},
    statusCode: 200,
  };
}
