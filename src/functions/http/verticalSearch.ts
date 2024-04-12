import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import fetch from "node-fetch";

export default async function verticalSearch(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { email = "", experienceKey = "", verticalKey } = request.queryParams;
  const mintTokenUrl = "/mintToken"; // Replace with your actual domain

  try {
    // Call mintToken to get a minted token
    const mintTokenResponse = await fetch(`${mintTokenUrl}?email=${email}`);
    const { token } = await mintTokenResponse.json();
    const experienceKey = 'knowledge-base';

    // Use the minted token to make a request to the API endpoint
    const searchApiUrl = `https://cdn.yextapis.com/v2/accounts/me/search/vertical/query?experienceKey=${experienceKey}&verticalKey=${verticalKey}&input=&api_key=${YEXT_PUBLIC_SEARCH_API_KEY}&v=20240404`;
    const searchResponse = await fetch(searchApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const searchData = await searchResponse.json();

    return {
      body: JSON.stringify(searchData),
      headers: {},
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      body: JSON.stringify({ error: "An error occurred during the search." }),
      headers: {},
      statusCode: 500,
    };
  }
}
