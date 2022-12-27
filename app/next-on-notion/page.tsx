// 
import { NextOnNotionPageObjectResponse } from "../../types/notion-on-next.types";
import { cachedGetParsedPages } from "../get";
import { NextOnNotionCard } from "./NextOnNotionCard";
import "notion-on-next/styles.css";
const databaseId = "03e5fc5d-f3aa-4c49-a7c2-86e97c736062";

export default async function NextOnNotionBlog() {
  const pages =
    await cachedGetParsedPages<NextOnNotionPageObjectResponse>(
      databaseId,
      undefined, // Add filters here: https://developers.notion.com/reference/post-database-query-filter
      [{ timestamp: "last_edited_time", direction: "descending" }] // Add sorts here: https://developers.notion.com/reference/post-database-query-sort
    );
  return (
    <div style={{ padding: "24px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1
        style={{ fontSize: "36px", textAlign: "center", marginBottom: "28px" }}
      >
        NextOnNotion Posts
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {pages.map((page) => (
          <NextOnNotionCard
            page={page}
            databaseId={databaseId}
            key={page.id}
          />
        ))}
      </div>
    </div>
  );
}
