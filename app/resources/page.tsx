import Link from "next/link";
import articles from "@/data/knowledge/articles.json";

export const metadata = {
  title: "Knowledge Center | TrustivaSetu",
  description: "Latest RBI, ABDM and healthcare industry updates."
};

export default function ResourcesPage() {
  return (
    <main style={{maxWidth:1100,margin:"40px auto",padding:"20px"}}>
      <h1>Knowledge Center</h1>

      <p>
        Official updates from RBI, ABDM and healthcare ecosystem.
      </p>

      <ul style={{padding:0,listStyle:"none"}}>
        {articles.map((article:any)=>(
          <li
            key={article.slug}
            style={{
              border:"1px solid #ddd",
              borderRadius:10,
              padding:20,
              marginBottom:20
            }}
          >
            <h2>
              <Link href={`/resources/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p>{article.summary}</p>

            <small>
              {article.source}
              {" • "}
              {article.publishedAt}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
