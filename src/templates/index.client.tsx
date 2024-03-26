import { Template, TemplateRenderProps } from "@yext/pages";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import SearchExperience from "../components/search/SearchExperience";
import "../index.css";

const Index: Template<TemplateRenderProps> = ({
  __meta,
  document,
}) => {
  return (
    <>
      <PageLayout templateData={{ __meta, document }}>
        <Banner name="Index Page" />
        <SearchExperience />
      </PageLayout>
    </>
  );
};

export default Index;
