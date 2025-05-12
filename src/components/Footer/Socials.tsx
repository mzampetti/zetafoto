import { SiteLocale } from "@/graphql/generated";
import ExternalLink from "../Links/ExternalLink";
import CustomIcon from "../Blocks/CustomIcon";

type PropsSocials = {
  locale: SiteLocale;
  variant?: Boolean;
  color?: string;
};

const socialData = [
  {
    social: "facebook",
    url: "https://www.facebook.com/stonfo/",
    title: "stonfo",
  },
  {
    social: "youtube",
    url: "https://www.youtube.com/user/StonfoVideo",
    title: "StonfoVideo",
  },
];

const socialDataFooter = [
  {
    social: "instagram",
    url: "https://www.instagram.com/stonfo_flyfishing/",
    title: "stonfo_flyfishing",
  },
  {
    social: "instagram",
    url: "https://www.instagram.com/stonfo_fishing_tackle/",
    title: "stonfo_fishing_tackle",
  },
  {
    social: "tiktok",
    url: "https://www.tiktok.com/@stonfoflyfishing",
    title: "stonfoflyfishing",
  },
];

const socialVariants = [...socialData, ...socialDataFooter];

export default function Socials({ locale, variant, color }: PropsSocials) {
  if (variant) {
    return socialVariants.map((s: any, num: number) => (
      <div className="group" key={num}>
        <ExternalLink
          url={s.url}
          locale={locale}
          title={s.social}
          className="flex gap-2 items-center text-sm py-1.5 lg:py-2 lg:gap-4 link"
        >
          <CustomIcon
            classes={`${
              color === "blue" ? "bg-secondary" : "bg-white"
            } size-5 group-hover:bg-accent duration-200`}
            fileName={s.social}
          />
          <span>{s.title}</span>
        </ExternalLink>
      </div>
    ));
  }
  return (
    <>
      <div className="flex gap-2 py-8 xl:px-6 xl:py-0 xl:items-end xl:pb-0.5 xl:pr-0 xl:translate-y-0.5">
        {socialData.map((s: any, num: number) => (
          <span key={num}>
            <ExternalLink
              url={s.url}
              locale={locale}
              title={s.social}
              className="group"
            >
              <CustomIcon
                classes={"bg-white size-5 hover:bg-accent"}
                fileName={s.social}
              />
            </ExternalLink>
          </span>
        ))}
      </div>
    </>
  );
}
