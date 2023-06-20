import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';

export const getNotionItems = async (options: ClientOptions) => {
  const notion = new Client(options);

  const response = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE,
  });

  return response.results.filter((page) => 'properties' in page);
};

export const getNotionProperties = async (options: ClientOptions) => {
  const notion = new Client(options);

  const response = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE,
    filter: {
      property: "Public",
      checkbox: {
        equals: true
      }
    },
  });

  return response.results
  .filter((page) => 'properties' in page)
  .map((page) => page);
}