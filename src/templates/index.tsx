// Start of Imports --------------------------
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
} from "@yext/pages";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import SearchExperience from "../components/search/SearchExperience";
// End of Imports --------------------------

export const config: TemplateConfig = {
  stream: {
    $id: "Index",
    filter: {
      entityIds: ["home"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_file"
    ],
    localization: {
      locales: ["en"],
    },
  },
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
  return (
    <>
      <PageLayout templateData={{ __meta, document }}>
        <Banner name="Boards" mode={__meta.mode} />
        <SearchExperience mode={__meta.mode}/>
      </PageLayout>
    </>
  );
};

export default Index;
