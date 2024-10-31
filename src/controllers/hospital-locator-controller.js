import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

const findNearbyHospitals = async (req, res) => {
  const { lat, lng } = req.query;
  
  const response = await client.placesNearby({
    params: {
      location: { lat, lng },
      radius: 5000,
      type: 'hospital',
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });
  
  res.json(response.data.results);
};


export default findNearbyHospitals