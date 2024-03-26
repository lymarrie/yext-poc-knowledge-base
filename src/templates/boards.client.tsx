import { Template, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider, provideHeadless } from "@yext/search-headless-react";
import { Pagination, ResultsCount, SearchBar, SpellCheck, VerticalResults } from "@yext/search-ui-react";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import BoardCard from "../components/search/BoardCard";
import "../index.css";

const Board: Template<TemplateRenderProps> = ({
  __meta,
  document,
}) => {
  const {
    name,
  } = document;

  // const data = { mainPhone, emails, logo, c_backgroundColor };

  const searcher = provideHeadless({
    apiKey: YEXT_PUBLIC_SEARCH_API_KEY,
    experienceKey: "knowledge-base",
    locale: "en",
    headlessId: "cards",
    verticalKey: "cards"
  });

  return (
    <>
      {/* <Schema data={document} /> */}
      <PageLayout templateData={{ __meta, document }}>
        <Banner name={name}  />
        <div className="centered-container">
          <div className="flex space-x-5">
            <a href="/index.html" className="font-semibold hover:underline">Home</a>
            <div className="space-x-2">
              <span>&#8594;</span>
              <span>{name}</span>
            </div>
          </div>
          <SearchHeadlessProvider searcher={searcher}>
            <div className="px-4 py-8">
              <div className="mx-auto flex max-w-5xl flex-col">
                <SearchBar 
                  placeholder="search for knowledge cards"
                />
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
          </SearchHeadlessProvider>
        </div>
      </PageLayout>
    </>
  );
};

export default Board;
