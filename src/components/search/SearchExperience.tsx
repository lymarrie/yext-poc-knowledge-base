import {
  SearchBar,
  ResultsCount,
  Pagination,
  VerticalResults,
  SpellCheck,
} from "@yext/search-ui-react";
import BoardCard from "./BoardCard";
import { useEffect, useState } from "react";
import {
  SearchHeadless,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";

const SearchExperience = () => {
  const [searcher, setSearcher] = useState<SearchHeadless | undefined>(
    undefined
  );

  useEffect(() => {
    const token = window?.YEXT_TOKENS?.AUTH_SEARCH.token;
    if (!token) {
      console.log("no token found on window");
    } else {
      console.log("token found on window");
      const newSearcher = provideHeadless({
        token: token,
        experienceKey: "knowledge-base",
        locale: "en",
        headlessId: "boards",
        verticalKey: "boards",
      });
      setSearcher(newSearcher);
    }
  }, []);

  return (
    <>
      {searcher ? (
        <SearchHeadlessProvider searcher={searcher}>
          <SearchInternal />
        </SearchHeadlessProvider>
      ) : (
        <></>
      )}
    </>
  );
};

const SearchInternal = () => {
  return (
    <div className="centered-container">
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <SearchBar placeholder="search for boards" />
          <SpellCheck />
          <ResultsCount />
          <VerticalResults
            CardComponent={BoardCard}
            customCssClasses={{
              verticalResultsContainer: "space-y-3",
            }}
          />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default SearchExperience;
