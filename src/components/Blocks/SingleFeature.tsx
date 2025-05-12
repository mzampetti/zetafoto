import Image from "next/image";

type Props = {
  feature: any;
};

const SingleFeature = ({ feature }: Props) => {
  const { featureIcon, featureTitle, featureDescription } = feature;

  return (
    <div className="w-full text-base-content bg-base-100 rounded-md border border-base-content/30 p-6 xl:px-8 md:py-10 text-center">
      <div className="relative mb-10 flex h-[70px] w-full">
        <Image
          src={featureIcon.url}
          className="object-contain absolute inset-0 w-full h-full"
          width={50}
          height={50}
          alt={featureTitle}
          title={featureTitle}
          aria-hidden={true}
        />
      </div>
      <h2 className="mb-5 text-base font-bold md:text-md">{featureTitle}</h2>
      {featureDescription && (
        <div
          className="text-sm opacity-90 xl:text-base"
          dangerouslySetInnerHTML={{ __html: featureDescription }}
        />
      )}
    </div>
  );
};

export default SingleFeature;
