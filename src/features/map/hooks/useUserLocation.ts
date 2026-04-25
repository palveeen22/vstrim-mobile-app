// import { useState, useEffect } from 'react';
// import Geolocation from '@react-native-community/geolocation';
// import type { UserLocation } from '../types/map.types';

// const DEFAULT: UserLocation = { latitude: 55.7558, longitude: 37.6173 }; // Moscow

// export function useUserLocation() {
//   const [location, setLocation] = useState<UserLocation>(DEFAULT);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
//         setLoading(false);
//       },
//       (err) => {
//         setError(err.message);
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10_000 },
//     );
//   }, []);

//   return { location, error, loading };
// }

import { useState } from 'react';
import type { UserLocation } from '../types/map.types';

const DEFAULT: UserLocation = { latitude: 55.7558, longitude: 37.6173 };

export function useUserLocation() {
  const [location] = useState<UserLocation>(DEFAULT);

  return { location, error: null, loading: false };
}