import fetch from 'node-fetch';

export default async function handler(req, res) {
  console.log('Distance API was called'); // simple message on each request

  const { origins, destinations } = req.query;

  if (!origins || !destinations) {
    console.log('Missing origins or destinations parameter');
    return res.status(400).json({ error: 'Missing origins or destinations parameter' });
  }

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Send a simple message with the data
    res.status(200).json({
      message: 'Distance data fetched successfully',
      data,
    });
  } catch (err) {
    console.error('Google API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
