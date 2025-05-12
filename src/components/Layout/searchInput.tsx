import { useState } from "react";
import translate from "@/labels";
import CustomIcon from "../Blocks/CustomIcon";

export default function SearchInput({ locale }) {
  const [txt, setTxt] = useState("");
  const HOST = process.env.NEXT_PUBLIC_HOST || "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!txt) return;
    const qs = `query=${encodeURIComponent(txt)}`;
    const newUrl = `${HOST}${
      locale === "en" ? "/en/search" : "/it/cerca"
    }?${qs}`;
    setTimeout(() => {
      window.location.href = newUrl;
    }, 500);
  }

  return (
    <form
      className="md:flex justify-start items-center leading-none xl:translate-y-2 w-4/5 lg:w-[300px] xl:w-4/5"
      role="search"
      onSubmit={(e) => handleSubmit(e)}
      action="#"
    >
      <label htmlFor="search" className="sr-only">
        {translate("layoutSearchLabel", locale)}
      </label>
      <div className="relative w-full">
        <input
          required
          type="search"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          name="search"
          id="search"
          aria-label={translate("layoutSearchLabel", locale)}
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder={translate("search.placeholder", locale)}
          className="py-1.5 placeholder:text-white xl:bg-white/5 bg-secondary rounded-full text-white pl-4 text-sm lg:text-base xl:text-sm xl:w-[250px] w-full pr-8"
        />
        <button
          type="submit"
          title={translate("search.label", locale)}
          className="absolute -right-2 top-1/2 size-8 -translate-y-1/2 text-green-light flex items-center xl:-right-14"
        >
          <CustomIcon fileName="search" classes="size-3 bg-white" />
        </button>
      </div>
    </form>
  );
}
