import { SiteLocale } from "@/graphql/generated";

type PropsContactTextBlock = {
  data: any;
  locale: SiteLocale;
};

const LabelsBlock = ({ data, locale }: PropsContactTextBlock) => {
  return (
    <section className="container lg:flex formatted lg:px-[100px] mx-auto lg:gap-12">
      <div
        className="md:w-1/2 uppercase"
        dangerouslySetInnerHTML={{ __html: data.label }}
      />
      <div
        className="md:w-1/2 lg:mt-2 font-sans text-md lg:text-lg mt-2"
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
    </section>
  );
};

export default LabelsBlock;
