import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import jwt from "jsonwebtoken";

export default async function mintToken(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { email = "" } = request.queryParams; // Extract email from query parameters

  console.log("Query params: ", request.queryParams);
  console.log("Email: ", email);

  const secret = YEXT_API_KEY_SECRET;
  const alg = "HS256";
  const kid = YEXT_API_KEY_ID;
  console.log(secret, kid)
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
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
