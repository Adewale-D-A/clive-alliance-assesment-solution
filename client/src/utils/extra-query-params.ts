export default function extractQueryString(url: string) {
  // Create a URL object
  const parsedUrl = new URL(url);

  // Get query parameters
  const params = new URLSearchParams(parsedUrl.search);
  return params;
}
