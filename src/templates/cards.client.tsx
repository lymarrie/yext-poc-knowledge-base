import { Template, TemplateRenderProps } from "@yext/pages";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import "../index.css";

const Card: Template<TemplateRenderProps> = ({
  __meta,
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
