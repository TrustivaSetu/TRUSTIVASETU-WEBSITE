"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import articles from "@/data/knowledge/articles.json";

export default function KnowledgeCenter() {

  const allArticles = articles as any[];

  const tags = [
    "All",
    ...Array.from(
      new Set(
        allArticles
          .map(a => a.primaryTag)
          .filter(Boolean)
      )
    ).sort()
  ];

  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {

    return allArticles
      .filter(article => {

        const tagMatch =
          active === "All" ||
          article.primaryTag === active ||
          (article.tags || []).includes(active);

        const q = search.toLowerCase();

        const text = (
          article.title + " " +
          article.summary + " " +
          article.source
        ).toLowerCase();

        return tagMatch && text.includes(q);

      })
      .sort(
        (a,b)=>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );

  }, [active,search]);

  return (

<div
style={{
maxWidth:1500,
margin:"40px auto",
padding:"20px"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:30,
flexWrap:"wrap",
gap:20
}}
>

<div>

<Link
href="/"
style={{
display:"inline-block",
padding:"10px 16px",
borderRadius:8,
background:"#0f766e",
color:"#fff",
textDecoration:"none",
fontWeight:600,
marginBottom:15
}}
>
← Back to Home
</Link>

<h1 style={{margin:0}}>
Knowledge Center
</h1>

<p style={{marginTop:10,color:"#666"}}>
Official RBI, ABDM, Healthcare & Medical Industry Updates
</p>

</div>

<input
placeholder="Search updates..."
value={search}
onChange={e=>setSearch(e.target.value)}
style={{
width:320,
maxWidth:"100%",
padding:12,
borderRadius:10,
border:"1px solid #ccc"
}}
/>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"260px 1fr",
gap:30
}}
>

<aside>

<h3>Categories</h3>

{tags.map(tag=>{

const count=allArticles.filter(a=>
tag==="All" ||
a.primaryTag===tag ||
(a.tags||[]).includes(tag)
).length;

return(

<button
key={tag}
onClick={()=>setActive(tag)}
style={{
display:"flex",
justifyContent:"space-between",
width:"100%",
padding:"12px",
marginBottom:10,
borderRadius:8,
border:"1px solid #ddd",
background:
active===tag
?"#0f766e"
:"#fff",
color:
active===tag
?"#fff"
:"#222",
cursor:"pointer"
}}
>

<span>{tag}</span>

<strong>{count}</strong>

</button>

);

})}

</aside>

<main>

<h2 style={{marginTop:0}}>
{active} Updates
</h2>

<p>
Showing <strong>{filtered.length}</strong> Articles
</p>

{filtered.map(article=>(

<div
key={article.slug}
style={{
border:"1px solid #ddd",
borderRadius:12,
padding:22,
marginBottom:24,
transition:"0.2s"
}}
>

<div
style={{
display:"flex",
gap:8,
flexWrap:"wrap",
marginBottom:15
}}
>

{(article.tags||[]).map((tag:string)=>(

<span
key={tag}
style={{
padding:"4px 10px",
background:"#eef6ff",
borderRadius:20,
fontSize:12,
fontWeight:600
}}
>
{tag}
</span>

))}

</div>

<h2>

<Link href={`/resources/${article.slug}`}>
{article.title}
</Link>

</h2>

<p>{article.summary}</p>

<div
style={{
display:"flex",
justifyContent:"space-between",
flexWrap:"wrap",
marginTop:20,
color:"#666"
}}
>

<span>{article.source}</span>

<span>{article.publishedAt}</span>

</div>

</div>

))}

</main>

</div>

</div>

);

}
