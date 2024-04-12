import { useEffect } from "react";
import { VerticalResults, Pagination, UniversalResults, StandardCard } from "@yext/search-ui-react"
import BoardCard from "./BoardCard"
import { useSearchActions, useSearchState } from "@yext/search-headless-react"

const SearchResults = () => {
    const searchActions = useSearchActions();
    const isVertical = useSearchState(state => state.meta.searchType === "vertical");

    useEffect(() => {
        searchActions.setQuery("product management");
        if (isVertical) {
            searchActions.executeVerticalQuery();
        } else {
            searchActions.executeUniversalQuery();
        }
    }, [])

    return (
        <div className="centered-container">
        <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
            {/* <SearchBar placeholder="search for boards" /> */}
            {/* <SpellCheck /> */}
            {/* <ResultsCount /> */}
            <VerticalResults
            CardComponent={BoardCard}
            customCssClasses={{
                verticalResultsContainer: "space-y-3",
            }}
            />
            <UniversalResults 
                verticalConfigMap={
                    {
                        "boards": {
                            CardComponent: StandardCard
                        },
                        "cards": {
                            CardComponent: StandardCard
                        }
                    }
                }
            />
        </div>
        {/* <Pagination /> */}
        </div>
    </div>
    )
}

export default SearchResults;