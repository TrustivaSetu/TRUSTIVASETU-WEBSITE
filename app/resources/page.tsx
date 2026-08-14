"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import articles from "@/data/knowledge/articles.json";
import sources from "@/data/knowledge/sources.json";

export default function KnowledgeCenter() {

  const allArticles = articles as any[];

  const [sourceParam, setSourceParam] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSourceParam(params.get("source"));
  }, []);

  const sourceMeta = sources.find((s) => s.id === sourceParam) || null;

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

        const sourceMatch =
          !sourceMeta || article.source === sourceMeta.name;

        const q = search.toLowerCase();

        const text = (
          article.title + " " +
          article.summary + " " +
          article.source
        ).toLowerCase();

        return tagMatch && sourceMatch && text.includes(q);

      })
      .sort(
        (a,b)=>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      );

  }, [active,search,sourceMeta]);

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
borderRadius:999,
background:"#0f766e",
color:"#fff",
textDecoration:"none",
fontWeight:600,
marginBottom:15
}}
>
← Back to Home
</Link>



<h1
style={{
margin:0,
fontSize:
(typeof window!=="undefined" && window.innerWidth<700)
?28
:40,
fontWeight:800
}}
>
Healthcare Finance Knowledge Center
</h1>

<p style={{marginTop:10,color:"#666"}}>
Official RBI • ABDM • IMA • IADVL • NABH • CDSCO • Healthcare Finance Intelligence Hub
</p>

<div
style={{
display:"grid",
gridTemplateColumns:
(typeof window!=="undefined" && window.innerWidth<700)
?"repeat(2,1fr)"
:"repeat(4,minmax(120px,1fr))",
gap:16,
marginTop:24,
marginBottom:20
}}
>

{[
["100+","Articles"],
["15+","Categories"],
["Auto","Updated"],
["Official","Sources"]
].map(([a,b])=>(
<div
key={a}
style={{
background:"#f8fafc",
border:"1px solid #e5e7eb",
borderRadius:14,
padding:"16px",
textAlign:"center"
}}
>
<div style={{fontSize:26,fontWeight:800,color:"#0f766e"}}>
{a}
</div>

<div style={{fontSize:14,color:"#666"}}>
{b}
</div>

</div>
))}

</div>

</div>

<input
placeholder="Search RBI, IADVL, IVF, Dental, NABH..."
value={search}
onChange={e=>setSearch(e.target.value)}
style={{
width:"100%",
maxWidth:320,
padding:12,
borderRadius:10,
border:"1px solid #ccc"
}}
/>

{sourceMeta && (
<div
style={{
display:"flex",
alignItems:"center",
gap:12,
flexWrap:"wrap",
marginTop:16,
padding:"10px 16px",
borderRadius:999,
background:"#eef6ff",
border:"1px solid #0f766e",
width:"fit-content"
}}
>
<span style={{fontSize:14,color:"#222"}}>
Showing updates from <strong>{sourceMeta.name}</strong>
</span>
<Link
href="/resources"
style={{
fontSize:13,
fontWeight:700,
color:"#0f766e",
textDecoration:"none"
}}
>
✕ Clear filter
</Link>
</div>
)}

</div>

<div
style={{
display:"grid",
position:"relative",
gridTemplateColumns:
(typeof window!=="undefined" && window.innerWidth<900)
?"1fr"
:"260px 1fr",
gap:30
}}
>

<aside
style={{
position:"sticky",
top:30,
alignSelf:"start"
}}
>

<h3
style={{
marginBottom:20,
fontSize:24,
fontWeight:700
}}
>
Browse Categories
</h3>

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
borderRadius:999,
border:"1px solid #ddd",
background:
active===tag
?"linear-gradient(135deg,#0f766e,#0d9488)"
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

<div
style={{
background:"linear-gradient(90deg,#0f766e,#0d9488)",
padding:"14px 22px",
borderRadius:14,
color:"#fff",
fontWeight:700,
marginBottom:25,
fontSize:18
}}
>
🔥 Latest Official Updates from RBI • ABDM • IMA • IADVL • NABH • CDSCO
</div>

<h2 style={{marginTop:0}}>
{active} Updates
</h2>

<p>
Showing <strong>{filtered.length}</strong> Articles
</p>

{filtered.length>0 && (

<div
style={{
background:"#f8fffd",
border:"2px solid #0f766e",
borderRadius:18,
padding:24,
marginBottom:28
}}
>

<div
style={{
fontSize:13,
fontWeight:700,
color:"#0f766e",
marginBottom:10
}}
>
⭐ Featured RBI Update
</div>

<h2 style={{marginTop:0}}>
{filtered[0].title}
</h2>

<p>
{filtered[0].summary.slice(0,220)}...
</p>

<Link
href={"/resources/"+filtered[0].slug}
style={{
color:"#0f766e",
fontWeight:700,
textDecoration:"none"
}}
>
📖 Read Full Update →
</Link>

</div>

)}

{filtered.length===0 && (

<div
style={{
background:"#f8fafc",
border:"1px dashed #ccc",
borderRadius:18,
padding:40,
textAlign:"center",
color:"#666"
}}
>
<p style={{fontSize:18,fontWeight:700,marginBottom:8,color:"#222"}}>
No updates found{sourceMeta ? ` from ${sourceMeta.name}` : ""}
</p>
<p style={{fontSize:14}}>
{sourceMeta
? "We haven't published any updates from this source yet — check back soon, or browse all updates below."
: "Try a different search term or category."}
</p>
{sourceMeta && (
<Link
href="/resources"
style={{
display:"inline-block",
marginTop:16,
color:"#0f766e",
fontWeight:700,
textDecoration:"none"
}}
>
View All Updates →
</Link>
)}
</div>

)}

{filtered.map(article=>(

<div
key={article.slug}
style={{
border:"1px solid #ddd",
borderRadius:18,
boxShadow:"0 8px 30px rgba(0,0,0,.08)",
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

<span
style={{
background:"#eef6ff",
padding:"6px 12px",
borderRadius:999,
fontWeight:600
}}
>
{article.source}
</span>

<span
style={{
background:"#f3f4f6",
padding:"6px 12px",
borderRadius:999,
fontSize:13
}}
>
📅 {new Date(article.publishedAt).toLocaleDateString("en-IN",{
day:"2-digit",
month:"short",
year:"numeric"
})}
</span>

</div>

</div>

))}

</main>

</div>

</div>

);

}
