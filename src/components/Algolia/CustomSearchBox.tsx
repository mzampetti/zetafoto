import React, { useState, useRef, useEffect } from "react";
import { useSearchBox } from "react-instantsearch";
import { t } from "@/lib/resolveLink";
import translate from "@/labels";
import CustomIcon from "@/components/Blocks/CustomIcon";

export default function CustomSearchBox(props: any) {
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function reset() {
    clear();
    setInputValue("");
  }

  useEffect(() => {
    if (props.resetNotification) {
      reset();
    }
  }, [props.resetNotification]);

  function setQuery(newQuery) {
    setInputValue(newQuery);
  }

  useEffect(() => {
    if (props.initialQuery) {
      setQuery(props.initialQuery);
      refine(props.initialQuery);
    }
  }, [props.initialQuery]);

  const placeholder = props.customPlaceholder
    ? props.customPlaceholder
    : t(`${props.section ? props.section + "-" : ""}placeholder`, props.locale);
  return (
    <form
      action=""
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (props.replaceUrl) {
          const url = window.location.href.split("?")[0];
          window.location.href = url + "?query=" + inputValue;
        } else {
          refine(inputValue);
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery("");

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <label
        htmlFor="search"
        className="text-sm lg:text-base tracking-wider font-bold"
      >
        {translate("search.label", props.locale)}
      </label>
      <div className="relative mt-2 block w-full md:flex md:items-center">
        <input
          type="search"
          ref={inputRef}
          className="h-12 w-full border py-1 px-4 text-sm"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
          maxLength={512}
          name="search"
          aria-label={translate("search.label", props.locale)}
          id="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          required={true}
          autoFocus
        />
        <button
          type="submit"
          title={translate("search.label", props.locale)}
          className="group absolute top-1 bottom-1 right-10"
        >
          <CustomIcon
            classes="size-5 bg-primary transition motion-safe:duration-200"
            fileName="arrow-right"
          />
        </button>
      </div>
      <span hidden={!isSearchStalled}>
        {translate("search.searching", props.locale)}
      </span>
    </form>
  );
}
