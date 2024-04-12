import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  GetAuthScope,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import BoardCard from "../components/search/BoardCard";
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
// End of Imports --------------------------

export const config: TemplateConfig = {
  stream: {
    $id: "Boards",
    filter: {
      entityTypes: ["ce_board"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "externalAuthorizedIdentities"
    ],
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getAuthScope: GetAuthScope<TemplateProps> = ({document}) => {
  // A. Checks if user's role matches any of the roles defined on the entity
  const rolesCheck = `(claims.custom_roles.exists(role => document.externalAuthorizedIdentities.exists(r => r == role)))`;
  // B. Checks if user's email ends in @yext.com
  const emailCheck = `claims.email.endsWith("@yext.com")`;
  // Checks if A AND B are both true
  return `${rolesCheck} && ${emailCheck}`;
}

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      // {
      //   type: "meta",
      //   attributes: {
      //     name: "description",
      //     content: document.description,
      //   },
      // },
      // {
      //   type: "meta", // Meta Tag (og:image)
      //   attributes: {
      //     property: "og:image",
      //     content: document.photoGallery
      //       ? document.photoGallery[0].image.url
      //       : null,
      //   },
      // },
      // {
      //   type: "link",
      //   attributes: {
      //     rel: "icon",
      //     type: "image/x-icon",
      //     href: relativePrefixToRoot + Favicon,
      //   },
      // },
    ],
  };
};

const Board: Template<TemplateRenderProps> = ({
  __meta,
  relativePrefixToRoot,
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
