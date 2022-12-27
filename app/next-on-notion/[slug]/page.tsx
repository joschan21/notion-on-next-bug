// 
import { notFound } from "next/navigation";
import { mediaMapInterface, NotionPageBody } from "notion-on-next";
import React from "react";
import _mediaMap from "../../../public/notion-media/media-map.json";
import { NextOnNotionPageObjectResponse } from "../../../types/notion-on-next.types";
import { cachedGetBlocks, cachedGetParsedPages } from "../../get";
import Image from "next/image";
import { NotionOnNextPageObjectResponse } from "notion-on-next/types/types";

const mediaMap: mediaMapInterface = _mediaMap;
interface PageProps {
  slug: string;
}
const databaseId = "03e5fc5d-f3aa-4c49-a7c2-86e97c736062";

export default async function BlogPage({
  params,
}: {
  params: PageProps;
}): Promise<React.ReactNode> {
  const { slug } = params;
  // This may seem like a roundabout way to retrieve the page, but getParsedPages is a per-request cached function. You can read more about it here https://beta.nextjs.org/docs/data-fetching/caching#preload-pattern-with-cache
  // The reason why we have to get all of the pages and then filter is because the Notion API can only search for pages via page id and not slug.
  const pages =
    await cachedGetParsedPages<NextOnNotionPageObjectResponse>(
      databaseId
    );
  const page = pages.find(
    (page: NotionOnNextPageObjectResponse) => page.slug === slug
  );
  if (!page) {
    notFound();
  }
  const blocks = await cachedGetBlocks(page.id);

  return (
    <div>
      <div style={{ width: "800px", margin: "20px auto 20px auto" }}>
        {mediaMap[databaseId][page.id].cover && (
          <Image
            src={mediaMap[databaseId][page.id].cover}
            alt={page.title || "Projects Post"}
            width={800}
            height={800}
          />
        )}

        <div>
          <div
            style={{ fontSize: "42px", fontWeight: 700, textAlign: "center" }}
          >
            {page.title}
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: 500, textAlign: "center" }}
          >
            {new Date(page.created_time).toLocaleDateString()}
          </div>
        </div>
      </div>
      <hr />
      <NotionPageBody
        blocks={blocks}
        pageId={page.id}
        databaseId={databaseId}
        mediaMap={mediaMap}
      />
    </div>
  );
}

export async function generateStaticParams() {
  // This generates routes using the slugs created from getParsedPages
  const pages =
    await cachedGetParsedPages<NextOnNotionPageObjectResponse>(
      databaseId
    );
  return pages.map((page: NotionOnNextPageObjectResponse) => ({
    slug: page.slug,
  }));
}
