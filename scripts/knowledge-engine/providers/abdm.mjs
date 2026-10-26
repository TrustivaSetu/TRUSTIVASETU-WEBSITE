export async function fetchABDM() {

  const url =
    "https://abdm.gov.in/strapicms/api/in-the-news?locale=en&sort[0]=releaseDate:desc&populate=*";

  const json = await fetch(url,{
    headers:{
      "User-Agent":"Mozilla/5.0",
      "Accept":"application/json"
    }
  }).then(r=>r.json());

  return (json.data || []).slice(0,20).map(item => ({

    source: "Ayushman Bharat Digital Mission",

    category: "Healthcare",

    title: item.attributes.title,

    url: item.attributes.href,

    publishedAt:
      item.attributes.releaseDate ||
      item.attributes.publishedAt,

    summary:
      item.attributes.publishedArticle || ""

  }));

}
