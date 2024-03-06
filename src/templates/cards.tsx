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
import { isProduction } from "@yext/pages/util";
import "../index.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import Schema from "../components/Schema";
import ContactSection from "../components/ContactSection";
// End of Imports --------------------------

export const config: TemplateConfig = {
  stream: {
    $id: "Cards",
    filter: {
      entityTypes: ["ce_card"],
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
  return document.slug;
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

const Card: Template<TemplateRenderProps> = ({
  __meta,
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    c_file
  } = document;

  return (
    <>
      {/* <Schema data={document} /> */}
      <PageLayout templateData={{ __meta, document }}>
        <Banner name={name}  />
        <div className="centered-container">
            <section>
            {c_file && <iframe src={c_file.url} className="w-full h-screen"></iframe>}
            </section>
        </div>
      </PageLayout>
    </>
  );
};

export default Card;
