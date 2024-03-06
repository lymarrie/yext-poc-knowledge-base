// Start of Imports --------------------------
import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import BoardCard from "../components/search/BoardCard";

// Search Imports
import {
  SearchBar,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  UniversalResults
} from "@yext/search-ui-react";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import Board from "./boards";
// End of Imports --------------------------


export const config: TemplateConfig = {
  name: "index.html"
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Knowledge Base Home Page",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot + Favicon,
        },
      },
    ],
  };
};

const Index: Template<TemplateRenderProps> = ({
  __meta,
  relativePrefixToRoot,
  document,
}) => {
//   const {} = document;


  const searcher = provideHeadless({
    apiKey: YEXT_PUBLIC_SEARCH_API_KEY,
    experienceKey: "knowledge-base",
    locale: "en",
    headlessId: "boards",
    verticalKey: "boards"
  });


  return (
    <>
      {/* <Schema data={document} /> */}
      <PageLayout templateData={{ __meta, document }}>
        <Banner name="Index Page" />
        <div className="centered-container">
          <SearchHeadlessProvider searcher={searcher}>
            <div className="px-4 py-8">
              <div className="mx-auto flex max-w-5xl flex-col">
                <SearchBar 
                  placeholder="search for boards"
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

export default Index;
