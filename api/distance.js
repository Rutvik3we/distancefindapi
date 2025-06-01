import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { origins, destinations } = req.query;

  if (!origins || !destinations) {
    return res.status(400).json({ error: 'Missing origins or destinations parameter' });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ message: 'Success', data });
  } catch (err) {
    console.error('Google API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
