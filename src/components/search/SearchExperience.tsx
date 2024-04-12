import {
  SearchBar,
  ResultsCount,
  Pagination,
  VerticalResults,
  SpellCheck,
} from "@yext/search-ui-react";
import BoardCard from "./BoardCard";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";
import {
  SearchHeadless,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";


const SearchExperience = ({mode}) => {
  const [token, setToken] = useState("");
  const [searchResult, setSearchResult] = useState(null); // State to hold the search result

  useEffect(() => {
    const token = window?.YEXT_TOKENS?.SITE_SEARCH.token;
    let auth = window?.YEXT_AUTH?.visitor;
    let auth_email = window?.YEXT_AUTH?.visitor.email;
    if (!token && (mode != 'development' )) {
      console.log("no token found on window");
    } else if (mode === 'development')  {
      console.log("local development");
      auth = {
        "visitor": {
            "email": "lmarrie@yext.com",
            "email_verified": true,
            "exp": 1711498142,
            "externalId": "",
            "family_name": "Marrie",
            "given_name": "Luc Yuki",
            "iat": 1711462142,
            "id": "google-oauth2|109441080300453837662",
            "iss": "https://dev-54gfk7o4bk7050q4.us.auth0.com/",
            "locale": "en",
            "name": "Luc Yuki Marrie",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocKekMeJiGdW7NiNM-t2uY3D4EIQgQs_aSnmE12P6ewSX44=s96-c",
            "updated_at": "2024-03-26T14:09:02.334Z"
        }
      };
      let auth_email = auth.visitor.email;
      console.log(auth_email);
      const getToken = async () => {
        const response = await fetch(`/mintToken?email=${auth_email}`);
        const searchToken = await response.json();
        if (searchToken.token) {
          console.log("search token minted");
          setToken(searchToken.token);
          console.log(searchToken.token);
        }
      };
      getToken();
    }
    else {
      console.log("token found on window - in production");
      console.log(auth);
      console.log(auth_email);
      const getToken = async () => {
        const response = await fetch(`/mintToken?email=${auth_email}`);
        const searchToken = await response.json();
        console.log(searchToken);
        if (searchToken.token) {
          console.log("search token minted");
          const newSearcher = provideHeadless({
            token: searchToken.token,
            experienceKey: "knowledge-base",
            locale: "en",
            headlessId: "boards",
            verticalKey: "boards",
          });
          setSearcher(newSearcher);
          console.log('searcher set')
        }
      };
      getToken();
    }
  }, []);

  return (
    <>
      {token ? (
          <>
            {/* <SearchBar placeholder="search for boards" /> */}
            {/* <SearchInternal token={token} verticalKey="boards"/> */}
            {/* <SearchInternal token={token} verticalKey="cards"/> */}
            <SearchInternal token={token} />
          </>
      ) : (
        <></>
      )}
    </>
  );
};

interface SearchInternalProps {
  token?: string
  verticalKey?: string
}

const SearchInternal = ( {token, verticalKey}:SearchInternalProps) => {
  const [searcher, setSearcher] = useState<SearchHeadless | undefined>(
    undefined
  );
  useEffect(() => { 
    if (token ) {
      // console.log("search token minted");
      console.log("sup");
      const newSearcher = provideHeadless({
        token: token,
        experienceKey: "knowledge-base",
        locale: "en",
        headlessId: `${verticalKey}-searcher` ? `${verticalKey}-searcher` : 'universal',
        // verticalKey: verticalKey ? verticalKey : undefined,
      });
      setSearcher(newSearcher);
    }
  }, [token, verticalKey])
  return (
    <>
      {searcher ? (
          <SearchHeadlessProvider searcher={searcher}>
            <SearchResults />     
          </SearchHeadlessProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchExperience;
