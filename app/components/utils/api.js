const baseUrl = 'https://api.1inch.dev/token'; // Replace with your actual base URL
const headers = { "Authorization": "Bearer [KEY]", "accept": "application/json" };

export async function searchTokens(query, chainId, limit = 10, ignoreListed = false) {
  const endpoint = `/v1.2/${chainId}/search`;
  const params = new URLSearchParams({
    query,
    limit,
    ignore_listed: ignoreListed.toString(),
  });

  try {
    const response = await fetch(${baseUrl}${endpoint}?${params}, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(Failed to search tokens. Status code: ${response.status});
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
