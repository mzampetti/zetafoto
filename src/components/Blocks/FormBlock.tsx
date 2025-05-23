import { SiteLocale } from "@/graphql/generated";
import Form from "@/components/Form/Form";
import { motion, Variants } from "framer-motion";

type PropsFormBlock = {
  data: any;
  locale: SiteLocale;
};

const FormBlock = ({ data, locale }: PropsFormBlock) => {
  const { prefixForm, titleForm } = data;
  return (
    <>
      <div className="container">
        <div className="grid gap-6">
          {prefixForm && (
            <div className="uppercase tracking-widest text-red text-sm">
              {prefixForm}
            </div>
          )}
          {titleForm && (
            <div
              className="text-lg md:text-xl lg:w-1/2 xl:text-2xl font-sans"
              dangerouslySetInnerHTML={{ __html: titleForm }}
            />
          )}
          <Form locale={locale} />
        </div>
      </div>
    </>
  );
};

export default FormBlock;
