
      import {
        PageObjectResponse,
      } from "@notionhq/client/build/src/api-endpoints";

      export interface NotionOnNextPageObjectResponse extends PageObjectResponse {
        slug: string | undefined;
        title: string | undefined;
        coverImage: string | undefined;
        databaseName: string | undefined;
        databaseId: string | undefined;
      }

      export interface mediaMapInterface {
        [key: string]: {
          [key: string]: {
            [key: string]: string;
          };
        };
      }
    
export type NextonNotionPageObjectResponse = NotionOnNextPageObjectResponse & {
	properties: {
		'Tags': Extract<PageObjectResponse["properties"][string], { type:"rich_text" }>
		'Name': Extract<PageObjectResponse["properties"][string], { type:"title" }>
	}
}