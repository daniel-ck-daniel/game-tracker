// Vercel serverless function to scrape Steam rating
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { appid } = req.query;
  
  if (!appid) {
    return res.status(400).json({ error: 'Missing appid parameter' });
  }
  
  try {
    // Fetch Steam store page
    const url = `https://store.steampowered.com/app/${appid}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    const html = await response.text();
    
    // Extract rating percentage from HTML
    // Steam shows ratings like "95% of the 1,234 user reviews"
    const ratingMatch = html.match(/(\d+)%\s+of\s+the\s+[\d,]+\s+user\s+reviews/);
    
    if (!ratingMatch) {
      // Try alternate format (sometimes appears differently)
      const altMatch = html.match(/game_review_summary.*?(\d+)%/);
      if (altMatch) {
        return res.status(200).json({ rating: parseInt(altMatch[1]) });
      }
      return res.status(200).json({ rating: null, message: 'Rating not found' });
    }
    
    const rating = parseInt(ratingMatch[1]);
    
    return res.status(200).json({ rating });
    
  } catch (error) {
    console.error('Error scraping Steam:', error);
    return res.status(500).json({ error: 'Failed to fetch rating', details: error.message });
  }
}
