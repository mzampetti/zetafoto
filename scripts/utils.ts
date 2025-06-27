import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: ".env.local" });
const API_KEY = process.env.DATO_API_KEY ?? "";
const DATO_ENV = process.env.DATO_ENV ?? null;

type recurseQueryProps = {
  q: string;
  values: any;
  propertyName: string;

  currentPage: number;
  pageSize: number;

  prevResults: any;
  done: boolean;
};

export async function getCollections(
  q: string,
  values: any,
  propertyName: string,
  size?: number
) {
  let pageSize = size || 500;
  return recurseQuery({
    q,
    values,
    propertyName,
    pageSize,
    prevResults: [],
    currentPage: 0,
    done: false,
  });
}

export async function recurseQuery({
  q,
  values,
  propertyName,
  pageSize,
  currentPage,
  prevResults,
  done,
}: recurseQueryProps): Promise<any> {
  if (!done) {
    const params = {
      ...values,
      first: pageSize,
      skip: currentPage,
    };
    let results;
    try {
      let response = await fetchData(q, { ...params });
      results = response[propertyName] || [];
      console.log("results", results.length);
    } catch (error) {
      // console.error("ERROR", error);
      throw error;
    }

    done = results?.length === 0;
    let all = [...prevResults, ...results];
    currentPage += pageSize;
    return await recurseQuery({
      q,
      values,
      prevResults: all,
      currentPage,
      done,
      pageSize,
      propertyName,
    });
  } else {
    return prevResults;
  }
}

export const fetchData = async (
  q: string,
  v: any = null,
  preview: boolean = false
) => {
  // console.info("API_KEY", API_KEY);
  console.info("FETCHING DATO", DATO_ENV);
  if (!API_KEY) return null;
  try {
    let url = `https://graphql.datocms.com`;
    if (DATO_ENV) {
      url = `https://graphql.datocms.com/environments/${DATO_ENV}`;
    }
    const response = await axios.post(
      `${url}${preview ? "/preview" : ""}`,
      { query: q, variables: v },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    console.info("status", response?.status);
    const data = response?.data;
    // console.info("data", data);
    if (data?.errors) {
      // console.error("QUERY ERROR", v, q, data?.errors);
      throw new Error(data?.errors);
    }
    return data?.data;
  } catch (error) {
    console.error("QUERY ERROR", v);
    console.error(q);
    throw error;
  }
};

function stripHtmlTags(str: string) {
  if (str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "").replace(/\\+/g, "");
  }
}

function extractAndCleanText(data: Array<Record<string, string>>): string {
  let text = data
    .flatMap((obj) => Object.values(obj))
    .map((text) => stripHtmlTags(text))
    .join("\n");

  let encodedText = new TextEncoder().encode(text);
  if (encodedText.length > 9999) {
    text = new TextDecoder().decode(encodedText.slice(0, 9000));
  }
  return text;
}

export function formatItem(item: any) {
  let obj = {
    ...item,
    cover: item.cover?.responsiveImage?.src || "",
    abstract: item.abstract ? stripHtmlTags(item.abstract) : "",
    objectID: item.id,
    content: item.sections ? extractAndCleanText(item.sections) : "",
  };

  delete obj.sections;
  return obj;
}
