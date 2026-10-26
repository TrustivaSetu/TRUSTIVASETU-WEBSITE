export async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "TrustivaSetu-KnowledgeBot/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} : ${url}`);
  }

  return await response.text();
}
