import articles from "@/data/knowledge/articles.json";
import { notFound } from "next/navigation";

export async function generateStaticParams(){
  return articles.map((a:any)=>({
    slug:a.slug
  }));
}

export default async function Page({
  params
}:{
  params:Promise<{slug:string}>
}){

  const {slug}=await params;

  const article=(articles as any[]).find(
    a=>a.slug===slug
  );

  if(!article){
    notFound();
  }

  return(
    <main
      style={{
        maxWidth:900,
        margin:"40px auto",
        padding:"20px"
      }}
    >

      <h1>{article.title}</h1>

      <p>
        <strong>Source:</strong> {article.source}
      </p>

      <p>
        <strong>Category:</strong> {article.category}
      </p>

      <p>
        <strong>Published:</strong> {article.publishedAt}
      </p>

      <hr/>

      <p>{article.summary}</p>

      <br/>

      <a
        href={article.url}
        target="_blank"
      >
        Read Official Source →
      </a>

    </main>
  );

}
